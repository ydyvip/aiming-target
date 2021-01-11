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
    <p>
      坐标：{{ "X:" + parseCoodination(selectedUnit.x) }}&emsp;{{
        "Y:" + parseCoodination(selectedUnit.y)
      }}
    </p>
    <div class="c-controls">
      <input
        class="btn"
        type="button"
        value="创建房间"
        @click="handleSendCommand('create')"
      />
      <input
        class="btn"
        type="text"
        v-model="currentAssumpId"
        placeholder="输入房间想定ID"
      />
      <input
        class="btn"
        type="button"
        value="加入房间"
        @click="
          handleSendCommand('join', {
            assumpId: currentAssumpId,
            actorId: '101'
          })
        "
      />
      <input
        class="btn"
        type="button"
        value="重新开始"
        @click="handleSendCommand('restart')"
      />
      <input
        class="btn"
        type="button"
        :value="isStarted ? '暂停对抗' : '开始对抗'"
        @click="handleSendCommand(isStarted ? 'pause' : 'start')"
      />
      <input
        class="btn"
        type="button"
        value="播放剧本"
        @click="handlePlayActors()"
      />
      <input
        class="btn"
        type="button"
        :value="'武器切换为' + weaponOptions[selectedUnit.weaponIndex]"
        @click="
          handleSendCommand('controls', {
            id: selectedUnit.unitId,
            cmd: 'c2s_switch_weapon'
          })
        "
      />
      <input
        class="btn"
        type="button"
        :value="'状态切换为' + statusOptions[selectedUnit.status]"
        @click="
          handleSendCommand('controls', {
            id: selectedUnit.unitId,
            cmd: selectedUnit.status
          })
        "
      />
      <input
        class="btn"
        type="button"
        value="填充弹药"
        @click="
          handleSendCommand('controls', {
            id: selectedUnit.unitId,
            cmd: 'c2s_load_ammunition'
          })
        "
      />
    </div>
    <div class="c-controls">
      <textarea
        class="btn"
        rows="10"
        cols="100"
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
import { strLength, getAngle } from "@/utils";

import { EventType, emitter } from "@/EventEmitter";
import { assumptionData } from "./assumption";
import { actionRecords } from "@/assets/story/records";
import { combatUnits } from "./combatUnits";

const visualDistance = 40; // 视线距离
const visualAngle = 124; // 视线夹角

const mapImg = require("@/assets/map-campaign-2.png"); // 地图背景
let mapScale = 10; // 放大倍

const TIMEFRAME = 250; // 帧数
const WEAPONINDEX = {
  0: "空手",
  1: "刀",
  2: "手枪",
  3: "步枪",
  4: "狙击枪"
};
const STATUSINDEX = {
  c2s_aim: "瞄准",
  c2s_carry: "手持"
};

export default {
  name: "Combat",
  data() {
    return {
      isPlanning: false, // 是否为规划模式
      isStarted: false, // 是否开始对抗
      stage: null,
      // 选中的unit
      selectedUnit: {
        name: null,
        weaponIndex: 0,
        status: "c2s_carry"
      },
      // 地图信息
      envConfig: {
        circulars: [],
        xsize: 130 * mapScale,
        ysize: 100 * mapScale
      },
      // 武器类型
      weaponOptions: WEAPONINDEX,
      // 状态类型
      statusOptions: STATUSINDEX,

      units: new Map(),
      logs: [], // 日志内容
      logMax: 8,

      // todo: test properties
      t: 0, // 开始时间
      waypointsLine: null,
      currentCmd: null,
      currentAssumpId: null
    };
  },
  computed: {
    unitsConfig() {
      return this.formatUnitsData(combatUnits);
    }
  },

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
      // this.stage.canvas.width = xsize;
      // this.stage.canvas.height = ysize;
      // scale the stage drawings to fill the canvas
      // this.stage.scaleX = scale;
      // this.stage.scaleY = scale;
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
      // createjs.Ticker.paused = true;
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

    formatUnitsData(units) {
      let newUnits = [];
      units.forEach(({ id, name, group, weapons, position }) => {
        newUnits.push({
          unitId: id,
          unitName: name,
          group,
          visualDistance, // 视线距离
          visualColor: group === "reds" ? "0xff0000" : "0x0000ff",
          visualAngle, // 视线夹角
          visualRotation: -visualAngle / 2,
          hp: 100, // 血量
          density: 4,
          weaponIndex: 0,
          weapons,
          status: "c2s_carry",
          position: {
            rotation: 0,
            x: position.x,
            y: position.y
          }
        });
      });

      return newUnits;
    },

    // 绘制线条
    drawLine(name, length, color, stroke = 1, isDash) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics
        .beginStroke(createjs.Graphics.getRGB(color))
        .setStrokeStyle(stroke);
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
      shape.graphics
        .beginStroke(createjs.Graphics.getRGB(color))
        .setStrokeStyle(stroke);

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
        .beginFill(createjs.Graphics.getRGB(fillColor))
        .beginStroke(createjs.Graphics.getRGB(color))
        .drawCircle(0, 0, density);
      return shape;
    },

    // 绘制矩形
    drawRect(name, color, fillColor, width, height) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill(createjs.Graphics.getRGB(fillColor))
        .beginStroke(createjs.Graphics.getRGB(color))
        .drawRect(0, 0, width, height);
      return shape;
    },

    // 绘制圆角矩形
    drawRoundRect(name, color, fillColor, x, y, width, height, radius) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill(createjs.Graphics.getRGB(fillColor))
        .beginStroke(createjs.Graphics.getRGB(color))
        .drawRoundRect(x, y, width, height, radius, radius, radius, radius);
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
        visualDistance
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
      shape.graphics.beginStroke(createjs.Graphics.getRGB(color));
      shape.graphics
        .moveTo(size, size)
        .lineTo(-size, -size)
        .moveTo(-size, size)
        .lineTo(size, -size);

      return shape;
    },

    // 绘制血量
    drawHealthBar(
      name,
      amount,
      ratio = 1,
      offsetX = 0,
      offsetY = 0,
      height = 6,
      stroke = 1
    ) {
      const hpContainer = new createjs.Container();
      hpContainer.name = name;
      // 绘制血量Bar
      const healthBar = this.drawRoundRect(
        healthPoints,
        "0x414141",
        "0x414141",
        offsetX,
        offsetY,
        amount + stroke * 2,
        height,
        height / 2
      );
      // 血量程度
      const ratioColor =
        ratio < 0.8 ? "0xffff00" : ratio < 0.4 ? "0xff0000" : "0x00ff00";
      // 绘制血量
      const healthPoints = this.drawRoundRect(
        healthPoints,
        ratioColor,
        ratioColor,
        offsetX + stroke,
        offsetY + stroke,
        amount * ratio,
        height - stroke * 2,
        (height - stroke * 2) / 2
      );
      // 加入bar
      hpContainer.addChild(healthBar);
      // 加入血条
      hpContainer.addChild(healthPoints);
      return hpContainer;
    },

    // 绘制文字
    drawText(name, context, color, offsetX = 0, offsetY = 0, size = 12) {
      let text = new createjs.Text(
        context,
        `${size}px Arial`,
        createjs.Graphics.getRGB(color)
      );

      text.x = offsetX;
      text.y = offsetY;
      // 是否按基线绘制
      // text.textBaseline = "alphabetic";
      text.textBaseline = "top";
      return text;
    },

    // 绘制目标单位
    paintingUnit(params) {
      const {
        unitId,
        unitName,
        visualDistance,
        visualColor,
        visualAngle,
        visualRotation,
        density,
        weaponIndex,
        status,
        position
      } = params;

      // 绘制Unit容器
      const unitContainer = new createjs.Container();
      unitContainer.name = unitId;
      unitContainer.unitId = unitId;
      unitContainer.unitName = unitName;
      unitContainer.visualDistance = visualDistance;
      unitContainer.visualColor = visualColor;
      unitContainer.visualAngle = visualAngle;
      unitContainer.visualRotation = visualRotation;
      // 挂载空手武器
      unitContainer.weaponIndex = weaponIndex;
      // 当前持枪状态
      unitContainer.status = status;

      // 添加形状实例到舞台显示列表
      this.stage.addChild(unitContainer);
      // 创建一个形状的显示对象
      this.units.set(unitId, unitContainer);

      // 绘制单位
      const circle = this.drawCircle("circle", unitId, "0xffffff", density);

      // 绘制方向指示线
      const headTo = this.drawLine("headTo", 10, "0x000000", 2);

      // 绘制目视扇区
      const visualVector = this.drawSector(
        "visualVector",
        circle.x,
        circle.y,
        visualDistance,
        visualAngle,
        visualRotation,
        visualColor
      );
      // 绘制死亡标志
      const deathMark = this.drawDeathState("deathState", 6, "0x414141");
      deathMark.alpha = 0;

      // 绘制名字
      const unitNameWidth = (strLength(unitName + unitId) / 2) * 12;
      // 当前持枪状态
      unitContainer.unitNameWidth = unitNameWidth;
      const unitLabel = this.drawText(
        "unitLabel",
        unitName + unitId,
        visualColor,
        // 0 - (strLength(unitName) / 2) * (12 / 2),
        0,
        0,
        12
      );

      // 绘制血量容器
      const hpContainer = this.drawHealthBar(
        "healthPointBar",
        unitNameWidth,
        1,
        0,
        14
      );

      // 死亡标志加入容器 0
      unitContainer.addChild(deathMark);
      // 目视扇区加入容器 1
      unitContainer.addChild(visualVector);
      // 加入容器 2
      unitContainer.addChild(circle);
      // 方向指示线加入容器 3
      unitContainer.addChild(headTo);
      // 名字加入容器4
      unitContainer.addChild(unitLabel);
      // 血条加入容器5
      unitContainer.addChild(hpContainer);

      // 初始化是否不显示
      // unitContainer.alpha = 0;

      unitContainer.x = position.x * mapScale;
      unitContainer.y = position.y * mapScale;

      // 绑定事件
      unitContainer.on("click", e => {
        const { currentTarget } = e;
        this.selectedUnit = currentTarget;
      });

      // 动态更新数据
      unitContainer.on("tick", e => {
        const { currentTarget } = e;
        const healthPointBar = currentTarget.getChildByName("healthPointBar");
        unitLabel.rotation = -currentTarget.rotation;
        healthPointBar.rotation = -currentTarget.rotation;
      });
    },

    // 绘制障碍物体
    paintingObstacle(params) {
      const { name, type, r, w, h, position } = params;
      let obstacle;
      switch (type) {
        case "circle":
          obstacle = this.drawCircle(name, "0x000000", "0xe1e1e1", r);
          obstacle.x = position.x;
          obstacle.y = position.y;
          this.stage.addChild(obstacle);
          break;
        case "rect":
          obstacle = this.drawRect(name, "0x000000", "0xe1e1e1", w, h);
          obstacle.x = position.x;
          obstacle.y = position.y;
          this.stage.addChild(obstacle);
          break;
      }
    },

    // 触发动作
    triggerAction(name, unit, data, interval = 0) {
      setTimeout(() => {
        this[`action${name}ing`](unit, data);
      }, interval);
    },

    // 攻击
    actionAttacking(
      unit,
      { attackRotation, attackDistance } = {
        attackRotation: 100,
        attackDistance: 80
      }
    ) {
      // 绘制攻击线
      const aimingTo = this.drawLine(
        "aimingTo",
        attackDistance * mapScale,
        unit.visualColor,
        1,
        true
      );

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
          const mouseMark = this.drawCircle(
            "clickMark",
            "0xffffff",
            "0x000000",
            4
          );
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
              id: this.selectedUnit.unitId,
              cmd: "c2s_attack"
            });
          } else if (nativeEvent.button === 2) {
            //鼠标右键
            this.handleSendCommand("controls", {
              id: this.selectedUnit.unitId,
              cmd: "c2s_move",
              position: {
                x: stageX / mapScale,
                y: stageY / mapScale
              }
            });
          } else if (nativeEvent.button === 1) {
            //鼠标中键
            const startXY = {
              x: this.selectedUnit.x,
              y: this.selectedUnit.y
            };
            const endXY = {
              x: stageX,
              y: stageY
            };
            // 取当前rotation朝向
            const currentRotation = this.selectedUnit.rotation;
            // 取两点之间的正北0度夹角角度
            const directAngle = getAngle(startXY, endXY);
            // 指向角度
            const rotatingAngle = Math.abs((directAngle + 270) % 360);

            this.handleSendCommand("controls", {
              id: this.selectedUnit.unitId,
              cmd: "c2s_rotation",
              direct: (function check(angle) {
                if (angle >= 0) {
                  return 1;
                } else if (angle < 0) {
                  return 0;
                }
              })(rotatingAngle - currentRotation),
              // 转角角度 只要计算差值
              angle: Math.abs(rotatingAngle - currentRotation)
            });
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
        this.render();
      }
    },
    render() {
      // 更新舞台将呈现下一帧
      this.stage.update();
    },
    syncSocket() {
      // 单兵态势
      emitter.on(EventType.ACTORSTATE, data => {
        this.pushLog({ "ACTORSTATE_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });

      // 范围视野范围内敌人
      emitter.on(EventType.VIEWENEMY, data => {
        this.pushLog({ "VIEWENEMY_INFO：": data });
        // let currentUnit = this.units.get(data.id);
        // this.actionsProcessing(currentUnit, data);
      });

      // 武器行为
      emitter.on(EventType.WEAPONACTION, data => {
        this.pushLog({ "WEAPONACTION_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });

      // 转向行为
      emitter.on(EventType.ROTATIONACTION, data => {
        this.pushLog({ "ROTATIONACTION_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });
    },

    // 动作解析
    actionsProcessing(unit, data) {
      let deathState = unit.getChildByName("deathState");
      let visualVector = unit.getChildByName("visualVector");
      let healthPointBar = unit.getChildByName("healthPointBar");
      const { visualAngle, rotation, timestamp, hp } = data || {};

      // 记录时间戳计算帧数
      const TIMEFRAME = timestamp - unit.timestamp || 0;
      unit.timestamp = timestamp;
      unit.alpha = 1;

      // 重绘制视野
      if (
        Object.prototype.hasOwnProperty(data, "visualAngle") &&
        visualAngle !== unit.visualAngle
      ) {
        unit.removeChild(visualVector);
        const newVisualVector = this.drawSector(
          "visualVector",
          0,
          0,
          unit.visualDistance,
          visualAngle,
          -visualAngle / 2,
          unit.visualColor
        );
        unit.addChildAt(newVisualVector, 1);
        unit.visualAngle = visualAngle;
      }

      // 重绘制血量
      if (Object.prototype.hasOwnProperty(data, "hp") && hp !== unit.hp) {
        unit.removeChild(healthPointBar);
        const newHpContainer = this.drawHealthBar(
          "healthPointBar",
          unit.unitNameWidth,
          hp / 100,
          0,
          14
        );
        unit.addChildAt(newHpContainer, 5);
        unit.hp = hp;
      }

      // HP状态处理
      if (hp <= 0) {
        // 阵亡
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
            10000,
            createjs.Ease.linear
          );
        }, 0);
      } else {
        // 复活
        // setTimeout(() => {
        //   unit.children.forEach(g => {
        //     g.alpha = 1;
        //   });
        //   deathState.alpha = 0;
        // }, TIMEFRAME);
      }

      // cmdProcessor 指令解析
      this.cmdProcessor(unit, data, TIMEFRAME);

      // this.pushLog({ `${unit.name.toUpperCase()}_INFO：`: data });
      console.log(`${unit.name.toUpperCase()}_INFO：`, data);
    },

    // cmdProcessor
    cmdProcessor(unit, data, TIMEFRAME) {
      const { id, cmd, x, y, rotation, consumerTime } = data || {};
      // 创建补间对象
      const tween = createjs.Tween.get(unit, {
        loop: false,
        override: true
      });
      // tween.on("change", function(event) {
      //   console.log(event);
      // });

      if (cmd) {
        switch (cmd) {
          case "s2c_move_start":
          case "s2c_move_end":
            // 创建补间动画
            tween.to(
              {
                x: x * mapScale,
                y: y * mapScale,
                rotation: this.parseRotating(unit, rotation, true)
              },
              TIMEFRAME,
              createjs.Ease.linear
            );

            break;
          case "s2c_rotation":
            // 处理转向
            tween.to(
              {
                rotation: this.parseRotating(unit, rotation)
              },
              consumerTime,
              createjs.Ease.linear
            );

            break;
          case "s2c_attack":
            this.triggerAction("Attack", unit, data);
            break;
        }
      }
    },

    // parseRotating
    parseRotating(graphics, targetDegree, noBias = false) {
      targetDegree -= 180;
      const rotation = graphics.rotation;
      const currentDegree = rotation % 180;
      // const direct = degree => {
      //   if (degree < -180) degree = 360 + degree;
      //   else if (degree > 180) degree = degree - 360;
      //   return degree;
      // };
      const bias = targetDegree - currentDegree;
      if (noBias && (Math.abs(bias) === 0 || Math.abs(bias) === 180))
        return rotation;
      const diffDegree = Math.min(
        Math.abs(targetDegree - currentDegree),
        360 - Math.abs(targetDegree - currentDegree)
      );
      console.log(
        "  rotation:",
        rotation,
        "\n  currentDegree:",
        currentDegree,
        "\n  targetDegree:",
        targetDegree,
        "\n  bias:",
        bias,
        "\n  diffDegree:",
        diffDegree
      );
      if (bias < 0) {
        return rotation - diffDegree;
      }
      return rotation + diffDegree;
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
      // let currentUnit = this.units.get("yellow");
      this.t += RenderAfter;
      setTimeout(() => {
        // this.actionsProcessing(currentUnit, Frame);
        this.handleSendCommand("controls", Frame);
      }, this.t);
    },

    // todo: 播放
    handlePlayActors() {
      this.animateActions(0, actionRecords);
    },

    pushLog(info) {
      if (this.logs.length > this.logMax) {
        this.logs = this.logs.splice(-this.logMax + 1);
      }
      this.logs.push(info);
    },

    parseCoodination(num) {
      return num / mapScale;
    },
    handleSendCommand(eventName, command) {
      // 字符处理成JSON对象
      if (typeof command === "string") {
        command = new Function("return " + command)();
      }
      // 事件类型处理
      switch (eventName) {
        case "create":
          // 绘制单位
          this.unitsConfig.map(params => {
            params.id = params.unitId;
            params.name = params.unitName;
            // 组装想定数据
            assumptionData.initData[params.group] &&
              assumptionData.initData[params.group].push(params);
            // 绘制单位
            this.paintingUnit(params);
          });
          console.log(assumptionData);
          command = assumptionData;
          break;
        case "join":
          break;
        case "start":
          createjs.Ticker.paused = false;
          this.isStarted = true;
          break;
        case "pause":
          createjs.Ticker.paused = true;
          this.isStarted = false;
          break;
      }

      // 按指令类型处理
      if (command && command.cmd) {
        switch (command.cmd) {
          case "c2s_switch_weapon":
            this.selectedUnit.weaponIndex =
              ((this.selectedUnit.weaponIndex || 0) + 1) %
              Object.keys(WEAPONINDEX).length;
            command.weapon_index = this.selectedUnit.weaponIndex;
            break;
          case "c2s_aim":
            this.selectedUnit.status = "c2s_carry";
            command.cmd = this.selectedUnit.status;
            break;
          case "c2s_carry":
            this.selectedUnit.status = "c2s_aim";
            command.cmd = this.selectedUnit.status;
            break;
        }
      }
      // console.log("SEND_CMD：", command);
      console.log("SEND_CMD：", JSON.stringify(command));
      socketMap.emit(eventName, command, res => {
        console.log("SEND_RETURN：", res);
        const { object } = res || {};
        const { reds, blues } = object || {};
        // 事件类型处理
        switch (eventName) {
          case "join":
            let redUnits = this.formatUnitsData(reds);
            // 绘制单位
            redUnits.map(params => {
              params.visualColor = "0xff0000";
              // 绘制单位
              this.paintingUnit(params);
            });
            let blueUnits = this.formatUnitsData(blues);
            blueUnits.map(params => {
              params.visualColor = "0x0000ff";
              // 绘制单位
              this.paintingUnit(params);
            });

            break;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./index.scss";
</style>
