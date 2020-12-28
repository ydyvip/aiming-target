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
          viewColor: "rgba(255,0,0,.3)",
          viewAngle: 170, // 视线夹角
          density: 4,
          rotation: 0,
          position: {
            x: 0,
            y: 0
          }
        },
        {
          name: "blue",
          viewDistance: 300,
          viewColor: "rgba(0,0,255,.3)",
          viewAngle: 170,
          density: 4,
          rotation: 0,
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
        this.drawObstacle(params);
      });
      // 绘制单位
      this.unitsConfig.map(params => {
        this.drawTarget(params);
      });
    },
    // 绘制圆形
    drawCircle(name, color, density) {
      let circle = new createjs.Shape();
      circle.graphics
        .beginFill("#fff")
        .beginStroke(color)
        .drawCircle(0, 0, density);
      return circle;
    },
    // 绘制目标单位
    drawTarget(params) {
      const {
        name,
        viewDistance,
        viewColor,
        viewAngle,
        density,
        rotation,
        position
      } = params;
      // 绘制外部容器
      const container = new createjs.Container();
      // 添加形状实例到舞台显示列表
      this.stage.addChild(container);
      // 创建一个形状的显示对象
      this.units.set(name, container);

      // 绘制单位
      const circle = this.drawCircle(name, name, density);

      // 形状实例的设置位置
      const currentUnit = this.units.get(name);

      // 绘制目视扇区
      const viewVector = this.drawSector(
        circle.x,
        circle.y,
        viewDistance,
        viewAngle,
        rotation,
        viewColor
      );

      // 加入容器
      container.addChild(circle);
      // 目视扇区加入容器
      container.addChild(viewVector);

      // 绑定事件
      // this.bindMouseMove(container);
    },
    // 绘制障碍物体
    drawObstacle(params) {
      const { name, type, r, position } = params;
      const obstacle = this.drawCircle(name, "black", r);
      obstacle.x = position.x;
      obstacle.y = position.y;

      this.stage.addChild(obstacle);
    },
    // 绘制扇区
    drawSector(x, y, r, angle, startFrom, color) {
      let vector = new createjs.Shape();
      vector.graphics.clear();
      vector.graphics.beginRadialGradientFill(
        [color, color],
        [0, 1],
        100,
        100,
        0,
        100,
        100,
        50
      );
      vector.graphics.moveTo(x, y);

      angle = Math.abs(angle) > 360 ? 360 : angle;
      //为了使方法方便使用，这里的起始角度和扇形弧度都用角度表示，由于三角函数用的弧度制，这里先转换为弧度。
      startFrom = (startFrom * Math.PI) / 180;

      let x1 = x + r * Math.cos(startFrom);
      let y1 = y + r * Math.sin(startFrom);
      let endAngle = startFrom + (angle * Math.PI) / 180;

      vector.graphics.lineTo(x1, y1);
      vector.graphics.arc(x, y, r, startFrom, endAngle, false);

      if (angle != 360) {
        vector.graphics.lineTo(x, y);
      }
      vector.graphics.endFill();
      return vector;
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
        currentUnit.x = data.x;
        currentUnit.y = data.y;
        currentUnit.rotation = data.angle - 180 - 170 / 2;
        this.pushLog({ "RED_INFO：": data });
      });
      emitter.on(EventType.ESCAPER, data => {
        let currentUnit = this.units.get("blue");
        currentUnit.x = data.x;
        currentUnit.y = data.y;
        currentUnit.rotation = data.angle - 180 - 170 / 2;
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
