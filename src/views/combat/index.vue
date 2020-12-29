<template>
  <div style="width: 100%; height: 100%; position: relative; overflow-y: auto;">
    <div id="main">
      <canvas
        v-show="stage"
        id="tournament"
        style="border:1px solid #e1e1e1;"
      ></canvas>
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
      </div>
      <ul class="c-logs">
        <li v-for="(log, i) in logs" :key="i">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import createjs from "createjs-npm";
import socketMap from "@/api/socket";
import { EventType, emitter } from "@/EventEmitter";

const viewDistance = 50; // 视线距离
const viewAngle = 124; // 视线夹角

export default {
  name: "Combat",
  data() {
    return {
      stage: null,
      envConfig: {
        circulars: [],
        xsize: 1000,
        ysize: 1300
      },
      unitsConfig: [
        {
          name: "red",
          viewDistance, // 视线距离
          viewColor: "0xff0000",
          viewAngle, // 视线夹角
          viewRotation: 0,
          density: 4,
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
          position: {
            x: 0,
            y: 0
          }
        }
      ],
      units: new Map(),
      logs: [], // 日志内容
      logMax: 14
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
    emitter.on(EventType.INITENV, data => {
      this.envConfig = data;
      this.envConfig.circulars.map(o => {
        o = Object.assign(o, {
          name: "obstacle",
          type: true ? "circle" : "rect",
          r: o.r,
          w: o.w,
          h: o.h,
          position: {
            x: o.x,
            y: o.y
          }
        });
        return o;
      });

      this.init();
      this.initMap(data.xsize, data.ysize);
      console.log("env", data);
    });
    this.init();
    this.initMap(this.envConfig.xsize, this.envConfig.ysize);

    this.syncSocket();
  },
  destroy() {
    socketMap.close();
  },
  methods: {
    // 初始化
    init() {
      let tournament = document.getElementById("tournament");
      tournament.width = this.envConfig.xsize;
      tournament.height = this.envConfig.ysize;

      // 创建一个舞台，得到一个参考的画布
      this.stage = new createjs.Stage(tournament);
      createjs.Touch.enable(this.stage);
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", this.doTicker);

      // 绘制单位
      this.unitsConfig.map(params => {
        this.paintingTarget(params);
      });
      // 绘制障碍物
      this.envConfig.circulars.map(params => {
        this.paintingObstacle(params);
      });
    },

    // 加载地图
    initMap(width, height) {
      const image = new Image();
      image.src = require("@/assets/map-campaign.png");
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
    paintingTarget(params) {
      const {
        name,
        viewDistance,
        viewColor,
        viewAngle,
        viewRotation,
        density,
        position
      } = params;

      // 绘制外部容器
      const container = new createjs.Container();
      // 添加形状实例到舞台显示列表
      this.stage.addChild(container);
      // 创建一个形状的显示对象
      this.units.set(name, container);

      // 绘制单位
      const circle = this.drawCircle("circle", name, "white", density);

      // 绘制方向指示线
      const headTo = this.drawLine("headTo", 10, "black", 2);
      // 修正为正面角度
      headTo.rotation = viewAngle / 2;

      // 绘制攻击线
      const aimingTo = this.drawLine("aimingTo", 1000, name, 1, true);
      // 修正为正面角度
      aimingTo.rotation = viewAngle / 2;
      aimingTo.alpha = 0;

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
      container.addChild(deathMark);
      // 目视扇区加入容器
      container.addChild(viewVector);
      // 加入容器
      container.addChild(circle);
      // 方向指示线加入容器
      container.addChild(headTo);
      // 攻击线加入容器
      container.addChild(aimingTo);

      container.alpha = 0;

      // 绑定事件
      this.bindEvent(container);
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

    // 绑定事件
    bindEvent(graph) {
      graph.addEventListener("click", function(e) {
        console.log("click");
      });
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
      // 追逐者
      emitter.on(EventType.PURSUER, data => {
        let currentUnit = this.units.get("red");
        let aimingTo = currentUnit.getChildByName("aimingTo");
        currentUnit.alpha = 1;
        // 创建补间动画
        let tween = createjs.Tween.get(currentUnit, {
          bounce: false,
          loop: false
        }).to(
          {
            x: data.x,
            y: data.y,
            rotation: data.angle - 180 - viewAngle / 2
          },
          250,
          createjs.Ease.linear
        );
        // tween.on("change", function(event) {
        //   console.log(event);
        // });

        aimingTo.alpha = data.attacking ? 1 : 0;
        // this.pushLog({ "RED_INFO：": data });
        // console.log("RED_INFO：", data);
      });

      // 逃亡者
      emitter.on(EventType.ESCAPER, data => {
        let currentUnit = this.units.get("blue");
        let aimingTo = currentUnit.getChildByName("aimingTo");
        currentUnit.alpha = 1;
        // 创建补间动画
        let tween = createjs.Tween.get(currentUnit, {
          bounce: false,
          loop: false
        }).to(
          {
            x: data.x,
            y: data.y,
            rotation: data.angle - 180 - 170 / 2
          },
          250,
          createjs.Ease.linear
        );
        // tween.on("change", function(event) {
        //   console.log(event);
        // });

        aimingTo.alpha = data.attacking ? 1 : 0;
        // this.pushLog({ "BLUE_INFO：": data });
        // console.log("BLUE_INFO：", data);
      });

      // action
      emitter.on(EventType.ACTION, data => {
        console.log("ACTION_INFO：", data);
      });
    },
    pushLog(info) {
      if (this.logs.length > this.logMax) {
        this.logs = this.logs.splice(-this.logMax + 1);
      }
      this.logs.push(info);
    },
    handleSendCommand(command) {
      socketMap.emit(command, {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./index.scss";
</style>
