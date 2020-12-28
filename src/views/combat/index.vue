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

export default {
  name: "Combat",
  data() {
    return {
      stage: null,
      envConfig: {
        circulars: [],
        xsize: 1000,
        ysize: 500
      },
      unitsConfig: [
        {
          name: "red",
          viewDistance: 300, // 视线距离
          viewColor: "0xff0000",
          viewAngle: 170, // 视线夹角
          viewRotation: 0,
          density: 4,
          position: {
            x: 0,
            y: 0
          }
        },
        {
          name: "blue",
          viewDistance: 300,
          viewColor: "0x0000ff",
          viewAngle: 170,
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
          name: "piller",
          type: "circle",
          r: o.r,
          position: {
            x: o.x,
            y: o.y
          }
        });
        return o;
      });

      this.init();
      console.log("env", data);
    });
    this.init();

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

      // 绘制障碍物
      this.envConfig.circulars.map(params => {
        this.paintingObstacle(params);
      });
      // 绘制单位
      this.unitsConfig.map(params => {
        this.paintingTarget(params);
      });
    },

    // 绘制线条
    drawLine(name, color) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics.beginStroke(color).setStrokeStyle(1);
      // .moveTo(0, 0)
      // .lineTo(1000, 0);
      this.drawDashLine(shape.graphics, 0, 0, 1000, 0, 5);

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
    drawCircle(name, color, density) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill("#fff")
        .beginStroke(color)
        .drawCircle(0, 0, density);
      return shape;
    },

    // 绘制扇区
    drawSector(name, x, y, r, angle, startFrom, color) {
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
        300
      );
      shape.graphics.moveTo(x, y);

      angle = Math.abs(angle) > 360 ? 360 : angle;
      //为了使方法方便使用，这里的起始角度和扇形弧度都用角度表示，由于三角函数用的弧度制，这里先转换为弧度。
      startFrom = (startFrom * Math.PI) / 180;

      let x1 = x + r * Math.cos(startFrom);
      let y1 = y + r * Math.sin(startFrom);
      let endAngle = startFrom + (angle * Math.PI) / 180;

      shape.graphics.lineTo(x1, y1);
      shape.graphics.arc(x, y, r, startFrom, endAngle, false);

      if (angle != 360) {
        shape.graphics.lineTo(x, y);
      }
      shape.graphics.endFill();
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
      const circle = this.drawCircle("circle", name, density);

      // 绘制攻击线
      const aimingTo = this.drawLine("aimingTo", name);

      // 修正为正面角度
      aimingTo.rotation = 170 / 2;
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

      // 加入容器
      container.addChild(circle);
      // 攻击线加入容器
      container.addChild(aimingTo);
      // 目视扇区加入容器
      container.addChild(viewVector);

      // 绑定事件
      // this.bindMouseMove(container);
    },

    // 绘制障碍物体
    paintingObstacle(params) {
      const { name, type, r, position } = params;
      const obstacle = this.drawCircle(name, "black", r);
      obstacle.x = position.x;
      obstacle.y = position.y;

      this.stage.addChild(obstacle);
    },

    // todo test绑定事件mousemove
    bindMouseMove(graph) {
      let oldX;
      let oldY;
      graph.addEventListener("mousedown", function(e) {
        console.log("mousedown");
        oldX = e.stageX;
        oldY = e.stageY;
      });
      graph.addEventListener("pressmove", function(e) {
        console.log("move");
        e.target.x += e.stageX - oldX;
        e.target.y += e.stageY - oldY;
        oldX = e.stageX;
        oldY = e.stageY;
      });
    },
    doTicker() {
      // 更新舞台将呈现下一帧
      this.render();
    },
    render() {
      // 更新舞台将呈现下一帧
      this.stage.update();
    },
    syncSocket() {
      emitter.on(EventType.PURSUER, data => {
        let currentUnit = this.units.get("red");
        let aimingTo = currentUnit.getChildByName("aimingTo");

        currentUnit.x = data.x;
        currentUnit.y = data.y;
        currentUnit.rotation = data.angle - 180 - 170 / 2;

        aimingTo.alpha = data.attacking ? 1 : 0;
        this.pushLog({ "RED_INFO：": data });
      });
      emitter.on(EventType.ESCAPER, data => {
        let currentUnit = this.units.get("blue");
        let aimingTo = currentUnit.getChildByName("aimingTo");

        currentUnit.x = data.x;
        currentUnit.y = data.y;
        currentUnit.rotation = data.angle - 180 - 170 / 2;

        aimingTo.alpha = data.attacking ? 1 : 0;
        this.pushLog({ "BLUE_INFO：": data });
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
