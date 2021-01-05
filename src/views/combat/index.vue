<template>
  <div
    ref="canvasWrap"
    id="canvasWrap"
    style="position: relative; overflow-y: auto;"
  >
    <canvas
      v-show="stage"
      id="canvasStage"
      style="border:1px solid #e1e1e1;"
      @contextmenu.prevent
    ></canvas>
    <p>当前选中单位：{{ selectedUnit }}</p>
    <div class="c-controls">
      <input
        class="btn"
        type="button"
        value="开始对抗"
        @click="handleSendCommand('start')"
      />
      <input
        class="btn"
        type="button"
        value="暂停"
        @click="handleSendCommand('pause')"
      />
      <input
        class="btn"
        type="text"
        v-model="currentCmd"
        placeholder="输入{}指令对象"
      />
      <input
        class="btn"
        type="button"
        value="发送指令"
        @click="handleSendCommand('controls', currentCmd)"
      />
      <input
        class="btn"
        type="button"
        :value="'武器切换为' + weaponOptions[selectedUnit.weapon]"
        @click="
          handleSendCommand('controls', {
            id: 'pursuer',
            cmd: 'c2s_switch_weapon'
          })
        "
      />
      <input
        class="btn"
        type="button"
        value="填充弹药"
        @click="
          handleSendCommand('controls', {
            id: 'pursuer',
            cmd: 'c2s_load_ammunition'
          })
        "
      />
    </div>

    <ul class="c-logs">
      <li v-for="(log, i) in logs" :key="i">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import createjs from "createjs-npm";
import socketMap from "@/api/socket";
import { EventType, emitter } from "@/EventEmitter";
import { actionRecords } from "./records";

const viewDistance = 50; // 视线距离
const viewAngle = 124; // 视线夹角

const mapImg = require("@/assets/map-campaign-1.png"); // 地图背景
let mapScale = 10; // 放大倍

const TIMEFRAME = 500; // 帧数
const WEAPONINDEX = {
  0: "空手",
  1: "刀",
  2: "手枪",
  3: "步枪",
  4: "狙击枪"
};

export default {
  name: "Combat",
  data() {
    return {
      isPlanning: false, // 是否为规划模式
      isStarted: false,
      stage: null,
      selectedUnit: {
        name: null,
        weapon: 0
      }, // 选中的unit
      envConfig: {
        circulars: [],
        xsize: 130 * mapScale,
        ysize: 100 * mapScale
      },
      // 武器类型
      weaponOptions: WEAPONINDEX,
      unitsConfig: [
        {
          name: "red",
          viewDistance, // 视线距离
          viewColor: "0xff0000",
          viewAngle, // 视线夹角
          viewRotation: 0,
          density: 4,
          weapon: 0,
          position: {
            x: 0,
            y: 0
          }
        },
        {
          name: "blue",
          viewDistance,
          viewColor: "0x0000ff",
          viewAngle,
          viewRotation: 0,
          density: 4,
          weapon: 0,
          position: {
            x: 0,
            y: 0
          }
        },
        {
          name: "yellow",
          viewDistance,
          viewColor: "0xffff00",
          viewAngle,
          viewRotation: 0,
          density: 4,
          weapon: 0,
          position: {
            x: 0,
            y: 500
          }
        }
      ],
      units: new Map(),
      logs: [], // 日志内容
      logMax: 14,

      // todo: test properties
      t: 0, // 开始时间
      waypointsLine: null,
      currentCmd: null
    };
  },
  computed: {},

  watch: {
    units: {
      handler(newVal) {},
      immediate: true,
      deep: true
    }
  },
  created() {},
  mounted() {
    const { xsize, ysize } = this.resizeToFit("canvasWrap");
    this.init(xsize, ysize);
    this.initMap(mapImg, xsize, ysize);

    this.syncSocket();

    window.onresize = () => {
      console.log("resize");
      const { xsize, ysize, scale } = this.resizeToFit("canvasWrap");

      // scale the canvas to fit the window
      this.stage.canvas.width = xsize;
      this.stage.canvas.height = ysize;
      // scale the stage drawings to fill the canvas
      this.stage.scaleX = scale;
      this.stage.scaleY = scale;
    };

    // todo: test
    // this.animateActions(0, actionRecords);
  },
  destroy() {
    socketMap.close();
  },
  methods: {
    // 初始化
    init(width, height) {
      const canvasStage = document.getElementById("canvasStage");
      canvasStage.width = width;
      canvasStage.height = height;

      // 创建一个舞台，得到一个参考的画布
      this.stage = new createjs.Stage(canvasStage);
      createjs.Touch.enable(this.stage);
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", this.doTicker);
    },

    // 加载地图
    initMap(imgfile, width, height) {
      const image = new Image();
      image.src = imgfile;
      image.onload = onImageLoad;
      const backgroudContainer = new createjs.Container(); // 绘制外部容器

      this.stage.addChild(backgroudContainer);
      function onImageLoad(event) {
        let bitmap = new createjs.Bitmap(event.target);
        bitmap.x = (width - bitmap.getBounds().width) >> 1;
        bitmap.y = (height - bitmap.getBounds().height) >> 1;
        bitmap.setTransform(
          0,
          0,
          width / bitmap.getBounds().width,
          height / bitmap.getBounds().height
        );
        backgroudContainer.addChild(bitmap);
      }

      // 绘制单位
      this.unitsConfig.map(params => {
        this.paintingUnit(params);
      });
      // 绘制障碍物
      // this.envConfig.circulars.map(params => {
      //   this.paintingObstacle(params);
      // });

      this.bindEvent(backgroudContainer);
    },

    // resize
    resizeToFit(wrapName, ratio) {
      const { clientWidth, clientHeight } = this.$refs[wrapName] || {};
      const { xsize, ysize } = this.envConfig;

      // determine the screen scale factor
      let scaleX = clientWidth / xsize;
      let scaleY = clientHeight / ysize;
      if (scaleX <= 1) {
        mapScale = mapScale * scaleX;
        return { xsize: xsize * scaleX, ysize: ysize * scaleX, scale: scaleX };
      }
      // use the lesser scale to fit the entire canvas on screen
      // let scale = Math.min(scaleX, scaleY);
      else {
        mapScale = mapScale * 1;
        return { xsize: xsize * 1, ysize: ysize * 1, scale: 1 };
      }
    },

    // 绘制线条
    drawLine(name, length, color, stroke = 1, isDash) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics.beginStroke(color).setStrokeStyle(stroke);
      if (isDash) {
        this.drawDashLine(shape.graphics, 0, 0, length, 0, 5);
      } else {
        shape.graphics.moveTo(0, 0).lineTo(length, 0);
      }
      return shape;
    },

    // 绘制虚线条
    drawDashLine(g, x1, y1, x2, y2, dashLength) {
      let dashLen = dashLength === undefined ? 5 : dashLength,
        xpos = x2 - x1, //得到横向的宽度;
        ypos = y2 - y1, //得到纵向的高度;
        numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
      //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      for (let i = 0; i < numDashes; i++) {
        if (i % 2 === 0) {
          g.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
          //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
        } else {
          g.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
        }
      }
    },

    // 绘制路径
    drawWaypointsLine(name, paths, color, stroke = 1) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics.beginStroke(color).setStrokeStyle(stroke);

      if (Array.isArray(paths))
        paths.forEach((p, i) => {
          if (i === 0) {
            shape.graphics.moveTo(p.x * mapScale, p.y * mapScale);
          } else {
            shape.graphics.lineTo(p.x * mapScale, p.y * mapScale);
          }
        });

      return shape;
    },

    // 绘制圆形
    drawCircle(name, color, fillColor, density) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill(fillColor)
        .beginStroke(color)
        .drawCircle(0, 0, density);
      return shape;
    },

    // 绘制矩形
    drawRect(name, color, fillColor, width, height) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill(fillColor)
        .beginStroke(color)
        .drawRect(0, 0, width, height);
      return shape;
    },

    // 绘制扇区
    drawSector(name, x, y, r, angle, startAngle, color) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics.beginRadialGradientFill(
        [
          createjs.Graphics.getRGB(color, 1),
          createjs.Graphics.getRGB(color, 0)
        ],
        [0, 1],
        0,
        0,
        0,
        0,
        0,
        viewDistance
      );
      shape.graphics.moveTo(x, y);

      angle = Math.abs(angle) > 360 ? 360 : angle;
      //为了使方法方便使用，这里的起始角度和扇形弧度都用角度表示，由于三角函数用的弧度制，这里先转换为弧度。
      startAngle = (startAngle * Math.PI) / 180;

      let x1 = x + r * Math.cos(startAngle);
      let y1 = y + r * Math.sin(startAngle);
      let endAngle = startAngle + (angle * Math.PI) / 180;

      shape.graphics.lineTo(x1, y1);
      shape.graphics.arc(x, y, r, startAngle, endAngle, false);

      if (angle != 360) {
        shape.graphics.lineTo(x, y);
      }
      shape.graphics.endFill();
      return shape;
    },

    // 绘制死亡状态
    drawDeathState(name, size, color, stroke = 2) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics.setStrokeStyle(stroke);
      shape.graphics.beginStroke(color);
      shape.graphics
        .moveTo(size, size)
        .lineTo(-size, -size)
        .moveTo(-size, size)
        .lineTo(size, -size);

      return shape;
    },

    // 绘制目标单位
    paintingUnit(params) {
      const {
        name,
        viewDistance,
        viewColor,
        viewAngle,
        viewRotation,
        density,
        position
      } = params;

      // 绘制Unit容器
      const unitContainer = new createjs.Container();
      unitContainer.name = name;
      // 挂载空手武器
      unitContainer.weapon = 0;
      // 添加形状实例到舞台显示列表
      this.stage.addChild(unitContainer);
      // 创建一个形状的显示对象
      this.units.set(name, unitContainer);

      // 绘制单位
      const circle = this.drawCircle("circle", name, "white", density);

      // 绘制方向指示线
      const headTo = this.drawLine("headTo", 10, "black", 2);
      // 修正为正面角度
      headTo.rotation = viewAngle / 2;

      // 绘制目视扇区
      const viewVector = this.drawSector(
        "viewVector",
        circle.x,
        circle.y,
        viewDistance,
        viewAngle,
        viewRotation,
        viewColor
      );
      // 绘制死亡标志
      const deathMark = this.drawDeathState("deathState", 6, "#919191");
      deathMark.alpha = 0;

      // 死亡标志加入容器
      unitContainer.addChild(deathMark);
      // 目视扇区加入容器
      unitContainer.addChild(viewVector);
      // 加入容器
      unitContainer.addChild(circle);
      // 方向指示线加入容器
      unitContainer.addChild(headTo);

      // 初始化是否不显示
      // unitContainer.alpha = 0;

      // 绑定事件
      unitContainer.addEventListener("click", e => {
        this.selectedUnit = unitContainer;
      });
    },

    // 绘制障碍物体
    paintingObstacle(params) {
      const { name, type, r, w, h, position } = params;
      let obstacle;
      switch (type) {
        case "circle":
          obstacle = this.drawCircle(name, "black", "#e1e1e1", r);
          obstacle.x = position.x;
          obstacle.y = position.y;
          this.stage.addChild(obstacle);
          break;
        case "rect":
          obstacle = this.drawRect(name, "black", "#e1e1e1", w, h);
          obstacle.x = position.x;
          obstacle.y = position.y;
          this.stage.addChild(obstacle);
          break;
      }
    },

    // 触发动作
    triggerAction(name, unit, data, interval = 100) {
      setTimeout(() => {
        this[`action${name}ing`](unit, data);
      }, interval);
    },

    // 攻击
    actionAttacking(unit, { angle, distance } = { angle: 100, distance: 80 }) {
      // 绘制攻击线
      const aimingTo = this.drawLine("aimingTo", distance, unit.name, 1, true);
      // 修正为正面角度
      aimingTo.rotation = viewAngle / 2;
      // 攻击线加入容器
      unit.addChild(aimingTo);
      setTimeout(() => {
        unit.removeChild(aimingTo);
      }, 100);
    },

    // 外部修改模式
    changeMode(keyName = "isPlanning", val) {
      this[keyName] = val !== null ? val : !this[keyName];
    },

    // 绑定事件
    bindEvent(graph) {
      graph.addEventListener(
        "mousedown",
        event => {
          const { nativeEvent, stageX, stageY } = event;
          // don't let it bubble.
          nativeEvent.preventDefault();
          // 绘制点选圈
          const mouseMark = this.drawCircle("clickMark", "white", "black", 4);
          mouseMark.x = stageX;
          mouseMark.y = stageY;
          createjs.Tween.get(mouseMark, {
            loop: false
          }).to(
            {
              scaleX: 5,
              scaleY: 5,
              alpha: 0
            },
            1000,
            createjs.Ease.linear
          );
          this.stage.addChild(mouseMark);
          // createjs 同时支持touchstart事件
          if (nativeEvent.button === 0 || nativeEvent.type === "touchstart") {
            // 鼠标左键
            this.handleSendCommand("controls", {
              id: this.selectedUnit.name === "red" ? "pursuer" : "escaper",
              cmd: "c2s_attack"
            });
          } else if (nativeEvent.button === 2) {
            //鼠标右键
            this.handleSendCommand("controls", {
              id: this.selectedUnit.name === "red" ? "pursuer" : "escaper",
              cmd: "c2s_move",
              position: {
                x: stageX / mapScale,
                y: stageY / mapScale
              }
            });
          } else if (nativeEvent.button === 1) {
            //鼠标中键
          }
          setTimeout(() => {
            this.stage.removeChild(mouseMark);
          }, 1000);
        },
        false
      );
    },
    doTicker(event) {
      // 更新舞台将呈现下一帧
      if (!event.paused) {
        // 当这个Ticker不是paused时保持活跃
      }
      this.render();
    },
    render() {
      // 更新舞台将呈现下一帧
      this.stage.update();
    },
    syncSocket() {
      // 单兵态势
      emitter.on(EventType.ACTORSTATE, data => {
        this.pushLog({ "ACTORSTATE_INFO：": data });
        let currentUnit = this.units.get(this.selectedUnit.name || "red");
        this.actionsProcessing(currentUnit, data);
      });

      // 范围视野范围内敌人
      emitter.on(EventType.VIEWENEMY, data => {
        this.pushLog({ "VIEWENEMY_INFO：": data });
        let currentUnit = this.units.get(this.selectedUnit.name || "red");
        this.actionsProcessing(currentUnit, data);
      });

      // 武器行为
      emitter.on(EventType.WEAPONACTION, data => {
        this.pushLog({ "WEAPONACTION_INFO：": data });
        let currentUnit = this.units.get(this.selectedUnit.name || "red");
        this.actionsProcessing(currentUnit, data);
      });

      // path
      emitter.on(EventType.PATH, data => {
        const waypoints = data || [];
        this.stage.removeChild(this.waypointsLine);
        this.waypointsLine = this.drawWaypointsLine(
          "pathTest",
          waypoints,
          "yellow"
        );
        this.stage.addChild(this.waypointsLine);
        this.animateActions(0, waypoints);

        // this.pushLog({ "PATH_INFO：": waypoints });
      });
    },

    // 动作解析
    actionsProcessing(unit, data) {
      // if (!this.isStarted) {
      //   this.isStarted = true;
      //   return;
      // }
      let deathState = unit.getChildByName("deathState");
      unit.alpha = 1;

      // 记录时间戳计算帧数
      const TIMEFRAME = data.timestamp - unit.timestamp || 0;
      unit.timestamp = data.timestamp;

      // 状态处理
      switch (data.state) {
        case "DEAD":
          setTimeout(() => {
            unit.children.forEach(g => {
              g.alpha = 0;
            });
            deathState.alpha = 1;
            // 创建补间动画
            createjs.Tween.get(deathState, {
              loop: false
            }).to(
              {
                alpha: 0
              },
              5000,
              createjs.Ease.linear
            );
          }, TIMEFRAME);
          break;
        case "ALIVE":
          setTimeout(() => {
            unit.children.forEach(g => {
              g.alpha = 1;
            });
            deathState.alpha = 0;
          }, TIMEFRAME);
          break;
        case "ATTACK":
          this.triggerAction("Attack", unit, data);
          break;
        default:
      }

      // 创建补间动画
      let tween = createjs.Tween.get(unit, {
        loop: false,
        override: true
      }).to(
        {
          x: data.x * mapScale,
          y: data.y * mapScale,
          rotation: data.angle + 180 - viewAngle / 2
        },
        TIMEFRAME,
        createjs.Ease.linear
      );
      // tween.on("change", function(event) {
      //   console.log(event);
      // });

      // this.pushLog({ `${unit.name.toUpperCase()}_INFO：`: data });
      console.log(`${unit.name.toUpperCase()}_INFO：`, data);
    },
    // todo: test动作
    animateActions(RenderAfter, Actions) {
      this.t += RenderAfter;

      setTimeout(() => {
        Actions.forEach(Frame => {
          this.animateFrame(TIMEFRAME, Frame);
        });
      }, this.t);
    },
    // todo: 执行帧动作
    animateFrame(RenderAfter, Frame) {
      let currentUnit = this.units.get("yellow");
      this.t += RenderAfter;
      setTimeout(() => {
        this.actionsProcessing(currentUnit, Frame);
      }, this.t);
    },

    pushLog(info) {
      if (this.logs.length > this.logMax) {
        this.logs = this.logs.splice(-this.logMax + 1);
      }
      this.logs.push(info);
    },
    handleSendCommand(eventName, command) {
      if (typeof command === "string") {
        let command = new Function("return " + command)();
      }
      console.log("SEND_CMD：", command);
      // 按指令类型处理
      if (command && command.cmd) {
        switch (command.cmd) {
          case "c2s_switch_weapon":
            this.selectedUnit.weapon =
              ((this.selectedUnit.weapon || 0) + 1) %
              Object.keys(WEAPONINDEX).length;
            command.weapon_index = this.selectedUnit.weapon;
            break;
        }
      }
      socketMap.emit(eventName, command);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./index.scss";
</style>
