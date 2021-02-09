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
    <p>
      当前选中单位:{{ selectedUnit }};&emsp;行为堆栈:{{
        behaviorStack | behaviorFilter
      }};&emsp;多选选中单位:{{ multipleUnits | multipleUnitsFilter }}
    </p>
    <p>
      指令总数:{{ actionRecords.length }};&emsp;已播放指令:{{
        cmdPlayedRecords.length
      }};&emsp;栈存指令:{{ cmdStackRecords.length }};&emsp;坐标:&emsp;x:{{
        selectedUnit.x / mapScale
      }},&nbsp;y:{{ selectedUnit.y / mapScale }}
    </p>
    <div class="c-controls">
      <input
        class="btn"
        type="button"
        value="创建房间"
        :disabled="isCreated"
        @click="handleSendCommand('create')"
      />
      <input
        class="btn"
        type="button"
        :disabled="isPlayed"
        :value="!isStarted ? '开始对抗' : `当前${timeSpeed}倍速`"
        @click="handleSwitchStart()"
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
        :value="!isPaused ? '暂停对抗' : '继续对抗'"
        :disabled="!isStarted"
        @click="handleSwitchPlaying()"
      />
      <input
        class="btn"
        type="button"
        value="播放剧本"
        :disabled="isPlayed"
        @click="handlePlayActors()"
      />
      <input
        class="btn"
        type="button"
        :value="'武器切换为' + weaponOptions[selectedUnit.weaponIndex]"
        @click="handleSwitchWeapon()"
      />
      <input
        class="btn"
        type="button"
        :value="'状态切换为' + statusOptions[selectedUnit.status]"
        @click="handleSwitchStatus()"
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
        rows="6"
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
      <input
        class="btn"
        type="button"
        value="输出历史"
        @click="handleExportRecords()"
      />
      <input
        class="btn"
        type="button"
        :value="'回放' + (playback ? '开' : '关')"
        @click="playback = !playback"
      />
      <input
        class="btn"
        type="button"
        :value="'行为' + (openBehavior ? '开' : '关')"
        @click="handleUseBehaviorTree()"
      />
    </div>
    <div class="c-controls">
      <textarea
        class="btn"
        rows="6"
        cols="100"
        type="text"
        v-model="customInitDataContext"
        placeholder="输入{}初始化initData对象"
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
    </div>
    <ul class="c-logs">
      <li v-for="(log, i) in sortLogs" :key="i">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script>
import createjs from "createjs-npm";
import socketMap from "@/api/socket";
import { debounce, strLength, getAngle, getRadians } from "@/utils";
import { Circle } from "@/utils/overlaping-circles";

import { EventType, emitter } from "@/EventEmitter";
import { assumptionData } from "./assumption";

import { actionRecords } from "@/assets/story/records-2";
import { combatUnits } from "./combatUnits";
// 行为树
import { BehaviorTree, Blackboard } from "@/behavior";
import { UnitFightAttack } from "@/assets/behaviors";

const visualDistance = 40; // 视线距离
const visualAngle = 124; // 视线夹角

const mapImg = require("@/assets/map-campaign-2.png"); // 地图背景

const TIMEFRAME = 250; // 帧数
const WEAPONINDEX = {
  0: "空手",
  1: "刀",
  2: "手枪",
  3: "步枪"
};
const STATUSINDEX = {
  c2s_aim: "瞄准",
  c2s_carry: "手持"
};
const MAPTYPES = ["single_soldier", "islands"];

const TIMESPEEDSCALES = [1, 2, 4, 8, 5000, 16000]; // 加速等级

const COMPOSIEOPERATION = [
  "source-over", //  0
  "source-in", //  1
  "source-out", //  2
  "source-atop", //  3
  "destination-over", //  4
  "destination-in", //  5
  "destination-out", //  6
  "destination-atop", //  7
  "lighter", //  8
  "darker", //  9
  "copy", // 10
  "xor" // 11
];
export default {
  name: "Combat",
  data() {
    return {
      isPlanning: false, // 是否为规划模式
      isCreated: false, // 是否创建房间
      isStarted: false, // 是否开始对抗
      isPlayed: false, // 是否播放脚本
      isPaused: false, // 是否暂停
      stage: null,

      openBehavior: false, // 是否执行行为
      playback: false, // 是否执行回放
      // 选中的unit
      selectedUnit: {
        unitId: null,
        name: null,
        weaponIndex: 0,
        status: "c2s_carry"
      },
      // json地图信息
      envConfig: {
        xsize: 130,
        ysize: 100
      },
      // 武器类型
      weaponOptions: WEAPONINDEX,
      // 状态类型
      statusOptions: STATUSINDEX,

      units: new Map(),
      selectedArea: {
        // 框选区域
        graph: null,
        startPoint: [],
        endPoint: []
      },
      // 多选选中单位
      multipleUnits: [],
      logs: [], // 日志内容
      logMax: 8,
      behaviorStack: [], // 行为指令栈存
      customInitDataContext: null, // 自定义初始化数据

      // todo: test properties
      waypointsLine: null,
      currentCmd: null,
      currentAssumpId: null,

      timeSpeed: 1, // 推演速度
      startTime: 0, // 开始时间节点
      duringTime: 0, // 播放经过时间

      actionRecords, // 指令总数
      cmdHistoryRecords: [], // 历史记录
      cmdStackRecords: [], // 播放指令栈
      cmdPlayedRecords: [], // 播放过的指令

      actorSituation: [] // 态势播报
    };
  },
  computed: {
    // 放大倍数
    mapScale() {
      const innerWidth = window.innerWidth;
      const { xsize } = this.envConfig;
      // determine the screen scale factor
      return innerWidth / xsize;
    },
    currentUnitId() {
      return this.$route.query.id || 0;
    },
    mapType() {
      const mapType = this.$route.query.map;
      return MAPTYPES.includes(mapType) && mapType;
    },
    sortLogs() {
      return this.logs.sort((a, b) => a.timestamp - b.timestamp);
    },
    // 自定义单位
    customInitData: {
      get() {
        // 字符处理成JSON对象
        const initData = this.customInitDataContext;
        try {
          return new Function("return " + initData)();
        } catch (error) {
          return null;
        }
      }
    },
    unitsConfig() {
      return this.formatUnitsData(combatUnits);
    }
  },
  filters: {
    // 行为解析
    behaviorFilter(behaviors) {
      return behaviors.map(({ id, type, targetId }) => {
        if (id) {
          let info = `${id}: Idling`;
          switch (type) {
            case "Attack":
              info = `${id}: Attacking enermy ${targetId}`;
              break;
          }
          return info;
        }
      });
    },
    // 多选单位
    multipleUnitsFilter(units) {
      return units.map(unit => unit.unitId).join(",");
    }
  },
  watch: {
    units: {
      handler(newVal) {},
      immediate: true,
      deep: true
    }
  },
  created() {
    this.selectedUnit.unitId = this.currentUnitId;
  },
  mounted() {
    const { xsize, ysize } = this.resizeToFit("canvasWrap");
    this.init(xsize, ysize);

    window.onresize = debounce(() => {
      const { xsize, ysize } = this.resizeToFit("canvasWrap");
      // init
      this.init(xsize, ysize);
    }, 500);
  },
  destroyed() {
    socketMap.close();
  },
  methods: {
    // 初始化
    init(xsize, ysize) {
      // 重制stage
      if (this.stage !== null) {
        console.log("reset", this.stage);
        this.stage.removeAllChildren();
        this.stage.removeAllEventListeners();
        this.stage.clear();
        // reset data
        Object.assign(this.$data, this.$options.data());
      }

      this.initStage(xsize, ysize);
      this.initMap(mapImg, xsize, ysize);
      // 创建探测层
      this.initLayer("detectAreaForReds");
      // 创建探测层
      this.initLayer("detectAreaForBlues");

      this.syncSocket();
      this.bindShortCut();

      this.stage.on("tick", () => {
        // 绘制探测图层
        this.pantingLayer("detectAreaForReds", "reds");
        // 绘制探测图层
        this.pantingLayer("detectAreaForBlues", "blues");
      });
    },

    // 初始化画布
    initStage(width, height) {
      const canvasStage = document.getElementById("canvasStage");
      canvasStage.width = width;
      canvasStage.height = height;

      // 创建一个舞台，得到一个参考的画布
      this.stage = new createjs.Stage(canvasStage);

      // stage声明
      createjs.Touch.enable(this.stage);
      createjs.Ticker.framerate = 60;
      createjs.Ticker.on("tick", this.doTicker);
      // createjs.Ticker.paused = true;
      // 绑定事件
      this.bindMouseEvent(this.stage);
    },

    // 加载地图
    initMap(imgfile, width, height) {
      const backgroudContainer = new createjs.Container(); // 绘制外部容器
      const mapType = this.mapType;

      if (mapType) {
        const bitmap = this.paintingMap(mapType, width, height);
        backgroudContainer.addChild(bitmap);
      } else {
        const image = new Image();
        image.src = imgfile;
        image.onload = onImageLoad;

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
      }
      this.stage.addChild(backgroudContainer);

      // 绑定鼠标操作
      this.bindEvent(this.stage);
    },

    // 初始化图层
    initLayer(name) {
      const layer = new createjs.Container();
      layer.name = name;
      this.stage.addChild(layer);
    },

    // 初始化bt
    initBT() {
      const { trees } = UnitFightAttack || {};
      const tree = new BehaviorTree();
      tree.load(trees[0], []);
      return tree;
    },

    // resize
    resizeToFit(wrapName) {
      const { clientWidth } = this.$refs[wrapName] || {};
      const { xsize, ysize } = this.envConfig;
      let mapScale = clientWidth / xsize;
      return {
        xsize: xsize * mapScale,
        ysize: ysize * mapScale
      };
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
    drawLine(
      name,
      length,
      color,
      stroke = 1,
      dashSegments = [0, 0],
      dashOffset = 0
    ) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.clear();
      shape.graphics
        .beginStroke(createjs.Graphics.getRGB(color))
        .setStrokeStyle(stroke);
      shape.graphics.setStrokeDash(dashSegments, dashOffset);

      shape.graphics.moveTo(0, 0).lineTo(length, 0);
      return shape;
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
            shape.graphics.moveTo(p.x * this.mapScale, p.y * this.mapScale);
          } else {
            shape.graphics.lineTo(p.x * this.mapScale, p.y * this.mapScale);
          }
        });

      return shape;
    },

    // 绘制圆形
    drawCircle(name, color, fillColor, x, y, radius, operation = 0) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill(
          fillColor === "transparent"
            ? "rgba(0,0,0,0)"
            : createjs.Graphics.getRGB(fillColor)
        )
        .beginStroke(createjs.Graphics.getRGB(color))
        .drawCircle(x, y, radius)
        .closePath();
      shape.compositeOperation = COMPOSIEOPERATION[operation];
      return shape;
    },

    // 绘制矩形
    drawRect(name, color, fillColor, x, y, width, height, operation = 0) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics
        .beginFill(createjs.Graphics.getRGB(fillColor))
        .beginStroke(createjs.Graphics.getRGB(color))
        .drawRect(x, y, width, height);
      shape.compositeOperation = COMPOSIEOPERATION[operation];
      return shape;
    },

    // 绘制圆弧
    drawArc(
      name,
      color,
      x,
      y,
      radius,
      startAngle = 0,
      endAngle = Math.PI * 2,
      operation = 0
    ) {
      let shape = new createjs.Shape();
      shape.name = name;
      shape.graphics.moveTo(x, y);
      shape.graphics.beginStroke(createjs.Graphics.getRGB(color));
      shape.graphics.arc(x, y, radius, startAngle, endAngle);
      shape.graphics.endStroke().closePath();
      shape.compositeOperation = COMPOSIEOPERATION[operation];
      return shape;
    },

    // 绘制圆角矩形
    drawRoundRect(
      name,
      color,
      fillColor,
      x,
      y,
      width,
      height,
      radius,
      doFill = true,
      dashSegments = [0, 0],
      dashOffset = 0
    ) {
      let shape = new createjs.Shape();
      shape.name = name;
      doFill && shape.graphics.beginFill(createjs.Graphics.getRGB(fillColor));

      shape.graphics.beginStroke(createjs.Graphics.getRGB(color));
      shape.graphics.setStrokeDash(dashSegments, dashOffset);
      shape.graphics.drawRoundRect(
        x,
        y,
        width,
        height,
        radius,
        radius,
        radius,
        radius
      );
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
        "healthBar",
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
        ratio < 0.4 ? "0xff0000" : ratio < 0.8 ? "0xffff00" : "0x00ff00";
      // 绘制血量
      const healthPoints = this.drawRoundRect(
        "healthPoints",
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
      text.name = name;
      text.x = offsetX;
      text.y = offsetY;
      // 是否按基线绘制
      // text.textBaseline = "alphabetic";
      text.textBaseline = "top";
      return text;
    },

    // 绘制地图
    paintingMap(type, width, height) {
      const blocksContainer = new createjs.Container();
      try {
        let shape = new createjs.Shape();
        shape.graphics.clear();
        const jsonMap = require(`@/assets/json-maps/${type}.json`);
        const mapMatrix = jsonMap;
        mapMatrix
          .filter(point => point.v === 0)
          .forEach((point, index) => {
            shape.graphics.arc(
              point.x * this.mapScale,
              point.y * this.mapScale,
              1,
              0,
              Math.PI * 2
            );
            shape.graphics.beginFill("0x000000");
          });
        shape.graphics.closePath();
        shape.cache(0, 0, width, height);
        blocksContainer.addChild(shape);
      } catch (error) {
        console.warn(error);
      }

      return blocksContainer;
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
        group,
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
      // 当前阵营
      unitContainer.group = group;
      // 当前锁定目标
      unitContainer.targetId = null;
      // 当前血量
      unitContainer.hp = 100;

      // 当前推演速度
      Object.defineProperty(unitContainer, "timeSpeed", {
        get: () => {
          return this.timeSpeed;
        }
      });
      // 当前态势数据
      Object.defineProperty(unitContainer, "actorSituation", {
        get: () => {
          return this.actorSituation;
        }
      });

      // 添加形状实例到舞台显示列表
      this.stage.addChild(unitContainer);
      // 创建一个形状的显示对象
      this.units.set(unitId, unitContainer);

      // 绘制单位
      const circle = this.drawCircle(
        `unit${unitId}`,
        "0x000000",
        "0xffffff",
        0,
        0,
        density
      );

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

      // 初始化阵营方向
      if (params.group === "blues") {
        unitContainer.rotation = -180;
      }

      unitContainer.x = position.x * this.mapScale;
      unitContainer.y = position.y * this.mapScale;

      // 创建blackboard
      const blackboard = new Blackboard();
      // 初始化单位行为树
      const BT = this.initBT();
      // ticker BT
      const btTickTime = 500;
      unitContainer.btInterval = setInterval(() => {
        this.actorSituation.length > 0 &&
          this.openBehavior &&
          BT.tick(unitContainer, blackboard);
      }, btTickTime);

      // 绑定事件
      unitContainer.on("click", eventClick => {
        const { currentTarget, nativeEvent } = eventClick;
        nativeEvent.preventDefault();
        // 锁定操作单位
        if (this.currentUnitId && currentTarget.unitId !== this.currentUnitId) {
          return;
        }
        // 鼠标左键
        if (nativeEvent.button === 0 || nativeEvent.type === "touchstart") {
          this.selectedUnit = currentTarget;
          this.multipleUnits = this.$options.data().multipleUnits;
        }
      });

      // 动态更新数据
      unitContainer.on("tick", eventTick => {
        const { currentTarget } = eventTick;
        const healthPointBar = currentTarget.getChildByName("healthPointBar");
        unitLabel.rotation = -currentTarget.rotation;
        healthPointBar.rotation = -currentTarget.rotation;
      });
    },

    // 绘制探测层
    pantingLayer(name, group) {
      const layer = this.stage.getChildByName(name);
      layer.removeAllChildren();

      const groupOfUnits = Array.from(this.units.values()).filter(
        unit => unit.group === group
      );
      const olCircles = [];
      const shape = new createjs.Shape();
      groupOfUnits.forEach(unit => {
        if (unit.hp === 0) return;
        olCircles.push(
          new Circle(
            unit.group,
            unit.x,
            unit.y,
            unit.visualDistance * this.mapScale * 0.5
          )
        );
      });
      for (let circle of olCircles) {
        const others = olCircles.filter(other => other !== circle);
        circle.outline(others, (x, y, radius, startAngle, endAngle) => {
          shape.graphics.moveTo(x, y);
          shape.graphics.beginStroke(
            createjs.Graphics.getRGB(
              circle.name === "reds" ? "0xff0000" : "0x0000ff"
            )
          );
          // 虚线圆
          shape.graphics.setStrokeDash([6, 3], 0);
          shape.graphics.arc(
            x,
            y,
            radius,
            getRadians(startAngle),
            getRadians(endAngle)
          );

          shape.graphics.endStroke().closePath();
        });
      }
      layer.addChild(shape);
    },

    // 绘制障碍物体
    paintingObstacle(name, type, x, y, params = { w: 0, h: 0, r: 0 }) {
      let obstacle = null;
      const { w, h, r } = params;
      switch (type) {
        case "circle":
          obstacle = this.drawCircle(name, "0x000000", "0xe1e1e1", 0, 0, r);
          obstacle.x = x;
          obstacle.y = y;
          break;
        case "rect":
          obstacle = this.drawRect(name, "0x000000", "0xe1e1e1", 0, 0, w, h);
          obstacle.x = x;
          obstacle.y = y;
          break;
      }
      // obstacle.cache(x, y, w, h);
      return obstacle;
    },

    // 触发动作
    triggerAction(type, unit, data, interval = 0) {
      switch (type) {
        case "Attack":
          setTimeout(() => {
            this.actionAttacking(unit, data);
          }, interval);
          break;
      }
    },

    // 攻击
    actionAttacking(
      unit,
      { attackRotation, attackDistance } = {
        attackRotation: 0,
        attackDistance: 30
      }
    ) {
      // 绘制攻击线
      const aimingTo = this.drawLine(
        "aimingTo",
        attackDistance * this.mapScale,
        unit.visualColor,
        1,
        [6, 3]
      );

      // 攻击偏转角
      aimingTo.rotation = attackRotation;
      // 销毁攻击
      createjs.Tween.get(aimingTo, {
        loop: false,
        override: false
      })
        .to(
          {
            alpha: 0
          },
          100,
          createjs.Ease.linear
        )
        .call(() => {
          unit.removeChild(aimingTo);
        });
      // 攻击线加入容器
      unit.addChild(aimingTo);
    },

    // 外部修改模式
    changeMode(keyName = "isPlanning", val) {
      this[keyName] = val !== null ? val : !this[keyName];
    },

    // 绑定事件
    bindEvent(stage) {
      stage.on(
        "stagemousedown",
        event => {
          const { nativeEvent, stageX, stageY } = event;
          if (nativeEvent.shiftKey) return;
          // don't let it bubble.
          nativeEvent.preventDefault();
          // 绘制点选圈
          const mouseMark = this.drawCircle(
            "clickMark",
            "0xffffff",
            "0x000000",
            0,
            0,
            4
          );
          mouseMark.x = stageX;
          mouseMark.y = stageY;
          createjs.Tween.get(mouseMark, {
            loop: false
          })
            .to(
              {
                scaleX: 5,
                scaleY: 5,
                alpha: 0
              },
              1000,
              createjs.Ease.linear
            )
            .call(() => this.stage.removeChild(mouseMark));
          this.stage.addChild(mouseMark);
          // createjs 同时支持touchstart事件
          if (nativeEvent.button === 0 || nativeEvent.type === "touchstart") {
            // 鼠标左键
            this.handleSendCommand("controls", {
              id: this.selectedUnit.unitId,
              cmd: "c2s_attack"
            });
          } else if (nativeEvent.button === 2) {
            // 鼠标右键
            if (this.multipleUnits.length) {
              this.handleSendCommand("controls", {
                cmd: "c2s_moves",
                actor_position: this.multipleUnits.map(unit => {
                  return {
                    id: unit.unitId,
                    x: stageX / this.mapScale,
                    y: stageY / this.mapScale
                  };
                })
              });
            } else {
              this.handleSendCommand("controls", {
                id: this.selectedUnit.unitId,
                cmd: "c2s_move",
                position: {
                  x: stageX / this.mapScale,
                  y: stageY / this.mapScale
                }
              });
            }
          } else if (nativeEvent.button === 1) {
            // 鼠标中键
            const startXY = {
              x: this.selectedUnit.x,
              y: this.selectedUnit.y
            };
            const endXY = {
              x: stageX,
              y: stageY
            };
            // 取当前rotation朝向 解析为正东夹角
            const currentRotation = this.selectedUnit.rotation;
            // 取两点之间的正东0度夹角角度
            const directAngle = getAngle(startXY, endXY);
            // 转角差值
            const diffDegree = Math.min(
              Math.abs(directAngle - currentRotation),
              360 - Math.abs(directAngle - currentRotation)
            );
            this.handleSendCommand("controls", {
              id: this.selectedUnit.unitId,
              cmd: "c2s_rotation",
              direct: (function check(angle) {
                const lOrR = (angle + 360) % 360 > 180;
                if (lOrR) {
                  return 0;
                } else {
                  return 1;
                }
              })(directAngle - currentRotation),
              // 转角角度 只要计算差值
              angle: diffDegree
            });
          }
        },
        false
      );
    },

    // 绑定鼠标框选
    bindMouseEvent(stage) {
      let moveListener = null;
      stage.on("stagemousedown", event => {
        const { nativeEvent } = event;
        if (!nativeEvent.shiftKey) return;
        this.selectedArea.startPoint = [nativeEvent.layerX, nativeEvent.layerY];
        moveListener = stage.on("stagemousemove", moveEvent => {
          const { nativeEvent } = moveEvent;
          stage.removeChild(this.selectedArea.graph);
          this.selectedArea.endPoint = [nativeEvent.layerX, nativeEvent.layerY];
          this.selectedArea.graph = this.drawRoundRect(
            "selectedArea",
            "0x414141",
            "0xffffff",
            this.selectedArea.startPoint[0],
            this.selectedArea.startPoint[1],
            nativeEvent.layerX - this.selectedArea.startPoint[0],
            nativeEvent.layerY - this.selectedArea.startPoint[1],
            0,
            false,
            [10, 5]
          );
          stage.addChild(this.selectedArea.graph);
        });
      });

      stage.on("stagemouseup", event => {
        const { nativeEvent } = event;
        stage.off("stagemousemove", moveListener);
        this.selectedArea.endPoint = [nativeEvent.layerX, nativeEvent.layerY];
        stage.removeChild(this.selectedArea.graph);
        const { startPoint, endPoint } = this.selectedArea;
        if (!nativeEvent.shiftKey) return;
        // 定义这次选定的单位
        this.multipleUnits = Array.from(this.units.values()).filter(
          unit =>
            unit.x > Math.min(startPoint[0], endPoint[0]) &&
            unit.x < Math.max(startPoint[0], endPoint[0]) &&
            unit.y > Math.min(startPoint[1], endPoint[1]) &&
            unit.y < Math.max(startPoint[1], endPoint[1])
        );
        this.selectedUnit = this.$options.data().selectedUnit;
      });
    },

    // 绑定快捷按键
    bindShortCut() {
      document.addEventListener("keydown", event => {
        const { keyCode } = event || {};
        switch (keyCode) {
          case 32: // 空格
            event.preventDefault();
            if (this.isStarted) this.handleSwitchPlaying();
            break;
        }
      });
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
        // this.pushLog({ "ACTORSTATE_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });

      // 范围视野范围内敌人
      emitter.on(EventType.VIEWENEMY, data => {
        this.pushLog({ "VIEWENEMY_INFO：": data });
        // let currentUnit = this.units.get(data.id);
        // this.behaviorsProcessing(currentUnit, data);
      });

      // 武器行为
      emitter.on(EventType.WEAPONACTION, data => {
        this.pushLog({ "WEAPONACTION_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });

      // 动作行为
      emitter.on(EventType.ACTORACTION, data => {
        this.pushLog({ "ACTORACTION_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });

      // 转向行为
      emitter.on(EventType.ROTATIONACTION, data => {
        this.pushLog({ "ROTATIONACTION_INFO：": data });
        let currentUnit = this.units.get(data.id);
        this.actionsProcessing(currentUnit, data);
      });

      // 态势数据接收
      emitter.on(EventType.SITUATION, data => {
        // console.log("SITUATION_INFO：", data);
        this.situationProcessing(data);
      });
    },

    // 行为解析
    behaviorsProcessing(unit, data) {
      // 是否执行行为
      if (!this.openBehavior) return;
      const { id, cmd, actors } = data || {};
      // const interval = 300;

      // 按指令类型处理
      switch (cmd) {
        case "s2c_enemy":
          if (actors.length) {
            // 锁定目标
            unit.targetId = actors[0].id;
            // 创建攻击行为
            // const aThink = {
            //   id,
            //   type: "Attack",
            //   targetId: actors[0].id,
            //   data: setInterval(() => {
            //     this.handleSendCommand("controls", {
            //       id: unit.unitId,
            //       cmd: "c2s_attack"
            //     });
            //   }, interval),
            //   clean: () => {
            //     console.warn("cleanBehavior", aThink);
            //     clearInterval(aThink.data);
            //     aThink.finished = true;
            //   },
            //   finished: false
            // };
            // 存储行为
            // this.behaviorStack.push(aThink);
          } else {
            unit.targetId = null;
            // 释放行为
            // this.releaseBehavior(
            //   think => think.id === id && think.type === "Attack"
            // );
          }
        default:
        // 再清除行为
        // this.cleanBehavior(think => think.finished);
      }
    },

    // 释放行为
    releaseBehavior(condition) {
      this.behaviorStack.filter(condition).forEach(think => {
        think.clean();
      });
    },

    // 清除行为
    cleanBehavior(condition) {
      this.behaviorStack = this.behaviorStack.filter(
        think => !condition(think)
      );
    },

    // 动作解析
    actionsProcessing(unit, data) {
      let deathState = unit.getChildByName("deathState");
      let visualVector = unit.getChildByName("visualVector");
      let healthPointBar = unit.getChildByName("healthPointBar");
      const { visualAngle, timestamp, hp } = data || {};

      // 记录时间戳计算帧数
      const TIMEFRAME = timestamp - unit.timestamp || 0;
      unit.timestamp = timestamp;
      unit.alpha = 1;

      // 重绘制视野
      if (
        Object.prototype.hasOwnProperty.call(data, "visualAngle") &&
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
      if (Object.prototype.hasOwnProperty.call(data, "hp") && hp !== unit.hp) {
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
          // 删除单位bt
          clearInterval(unit.btInterval);
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
      // console.log(`${unit.name.toUpperCase()}_INFO：`, data);
    },

    // cmdProcessor
    cmdProcessor(unit, data, TIMEFRAME) {
      const { targetId, cmd, x, y, rotation, consumerTime = 100 } = data || {};
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
            // todo: 绘制行动痕迹
            const dotsTrack = this.drawCircle(
              "dotsTrack",
              "0xffffff",
              "0x000000",
              0,
              0,
              2
            );
            dotsTrack.x = x * this.mapScale;
            dotsTrack.y = y * this.mapScale;
            createjs.Tween.get(dotsTrack, {
              loop: false,
              override: false
            })
              .to(
                {
                  alpha: 0
                },
                10000,
                createjs.Ease.linear
              )
              .call(() => {
                this.stage.removeChild(dotsTrack);
              });
            this.stage.addChild(dotsTrack);

            // 创建补间动画
            tween
              .to(
                {
                  x: x * this.mapScale,
                  y: y * this.mapScale,
                  rotation: this.parseRotating(unit, rotation)
                },
                TIMEFRAME,
                createjs.Ease.linear
              )
              .call(this.rotatingDone, [unit, rotation], this);

            break;
          case "s2c_rotation":
            // 处理转向;
            if (consumerTime)
              tween
                .to(
                  {
                    rotation: this.parseRotating(unit, rotation, true)
                  },
                  consumerTime,
                  createjs.Ease.linear
                )
                .call(this.rotatingDone, [unit, rotation], this);

            break;
          case "s2c_attack":
            // 触发攻击
            this.triggerAction("Attack", unit, data);
            unit.targetId = targetId;

            break;
          // 被攻击
          case "s2c_attacked":
            // if (hp === 0) {
            //   // 清除锁定行为(自己的和别人的)
            //   this.releaseBehavior(
            //     think => think.id === id || think.targetId === id
            //   );
            //   this.cleanBehavior(
            //     think => think.id === id || think.targetId === id
            //   );
            // }
            break;
        }
      }
    },

    // 解析转向数据
    parseRotating(graphics, targetDegree, noBias = false) {
      targetDegree -= 180;
      const rotation = graphics.rotation;
      let currentDegree;
      if (rotation > 179) {
        currentDegree = rotation - 360;
      } else if (rotation < -180) {
        currentDegree = rotation + 360;
      } else {
        currentDegree = rotation;
      }
      const diffDegree = Math.min(
        Math.abs(targetDegree - currentDegree),
        360 - Math.abs(targetDegree - currentDegree)
      );
      const bias = targetDegree - currentDegree;
      const lOrR = (bias + 360) % 360 > 180;
      if (!noBias && (Math.abs(bias) === 0 || Math.abs(bias) === 180)) {
        return rotation;
      }
      if (lOrR) {
        return rotation - diffDegree;
      }
      return rotation + diffDegree;
    },

    // 还原朝向向量
    rotatingDone(unit, rotation) {
      if (unit.rotation > 179) {
        unit.rotation = unit.rotation - 360;
      } else if (unit.rotation < -180) {
        unit.rotation = unit.rotation + 360;
      }
    },

    // 态势解析
    situationProcessing({ actorSituation }) {
      this.actorSituation = actorSituation;
    },

    // todo: test动作
    animateActions(RenderAfter, Frame) {
      this.cmdStackRecords.push(
        setTimeout(() => {
          this.handleSendCommand("controls", Frame);
        }, RenderAfter)
      );
    },

    // 播存动画
    savingActions(conditionFunc = frame => frame, offsetTime = 0) {
      this.actionRecords.filter(conditionFunc).forEach(frame => {
        this.animateActions(frame.TIMEFRAME - offsetTime, frame);
      });
    },

    // todo: 播放
    handlePlayActors() {
      const timeSpeed = this.timeSpeed;
      if (!this.isPlayed) {
        this.startTime = new Date().getTime();
        this.savingActions(frame => (frame.TIMEFRAME /= timeSpeed));
        this.isPlayed = true;
      }
    },

    // todo: 导出记录
    handleExportRecords() {
      console.warn("History_Records:", JSON.stringify(this.cmdHistoryRecords));
    },

    pushLog(info) {
      if (this.logs.length > this.logMax) {
        this.logs = this.logs.splice(0, this.logMax);
      }
      this.logs.unshift(info);
    },

    // 使用行为树
    handleUseBehaviorTree() {
      this.openBehavior = !this.openBehavior;
    },

    // 切换开始对抗
    handleSwitchStart() {
      if (this.isStarted) {
        let currentScaleIndex =
          TIMESPEEDSCALES.indexOf(this.timeSpeed) % TIMESPEEDSCALES.length;

        if (TIMESPEEDSCALES.length - 1 === currentScaleIndex)
          currentScaleIndex = 0;
        else currentScaleIndex++;
        this.timeSpeed = TIMESPEEDSCALES[currentScaleIndex];
        this.handleSendCommand("speed", {
          speed: this.timeSpeed
        });
      } else {
        this.handleSendCommand("start");
        createjs.Ticker.paused = false;
      }
    },

    // 切换武器
    handleSwitchWeapon() {
      this.selectedUnit.weaponIndex =
        ((this.selectedUnit.weaponIndex || 0) + 1) %
        Object.keys(WEAPONINDEX).length;
      let weapon_index = this.selectedUnit.weaponIndex;

      this.handleSendCommand("controls", {
        id: this.selectedUnit.unitId,
        cmd: "c2s_switch_weapon",
        weapon_index
      });
    },

    // 切换姿态
    handleSwitchStatus() {
      let status = this.selectedUnit.status;
      switch (status) {
        case "c2s_aim":
          this.selectedUnit.status = "c2s_carry";

          break;
        case "c2s_carry":
          this.selectedUnit.status = "c2s_aim";

          break;
      }

      this.handleSendCommand("controls", {
        id: this.selectedUnit.unitId,
        cmd: this.selectedUnit.status
      });
    },

    // 切换播放和暂停
    handleSwitchPlaying() {
      // 定义变量
      const status = this.isPaused ? "continue" : "pause";
      switch (status) {
        // 暂停
        case "continue":
          if (this.startTime !== 0) {
            // 经过时间
            this.savingActions(frame => {
              return !this.cmdPlayedRecords.includes(frame);
            }, this.duringTime);
          }
          createjs.Ticker.paused = false;
          this.isPaused = false;

          break;
        // 继续
        case "pause":
          // 清除播放时节
          this.cmdStackRecords.forEach(record => {
            clearTimeout(record);
          });
          this.cmdStackRecords = [];
          createjs.Ticker.paused = true;
          this.isPaused = true;
          break;
      }

      this.handleSendCommand(status);
    },

    handleSendCommand(eventName, command) {
      // 字符处理成JSON对象
      if (typeof command === "string") {
        command = new Function("return " + command)();
      }
      // 事件类型处理
      switch (eventName) {
        case "create":
          if (!this.isCreated) {
            if (this.customInitData) {
              this.formatUnitsData(this.customInitData.reds).map(params => {
                params.id = params.unitId;
                params.name = params.unitName;
                params.group = "reds";
                params.visualColor = "0xff0000";
                // 绘制单位
                this.paintingUnit(params);
              });
              this.formatUnitsData(this.customInitData.blues).map(params => {
                params.id = params.unitId;
                params.name = params.unitName;
                params.group = "blues";
                params.visualColor = "0x0000ff";
                // 绘制单位
                this.paintingUnit(params);
              });
              assumptionData.initData = this.customInitData;
            } else {
              this.unitsConfig.map(params => {
                params.id = params.unitId;
                params.name = params.unitName;
                // 组装想定数据
                assumptionData.initData[params.group] &&
                  assumptionData.initData[params.group].push(params);
                // 绘制单位
                this.paintingUnit(params);
              });
              // 推演速度
              assumptionData.initData.timeSpeed = this.timeSpeed;
            }
            // 场景
            assumptionData.initData.mapType = this.mapType || MAPTYPES[0];
            // 回放
            assumptionData.playback = this.playback;

            // 锁定单位
            if (this.currentUnitId) {
              this.selectedUnit = this.units.get(this.currentUnitId);
            }

            command = assumptionData;
            this.isCreated = true;
          }
          break;
        case "join":
          break;
        case "start":
          this.startTime = new Date().getTime();
          this.isStarted = true;
          break;
        case "continue":
          break;
        case "pause":
          break;
      }

      // 按指令类型处理
      // if (command && command.cmd) {
      //   switch (command.cmd) {
      //     case "c2s_switch_weapon":
      //       break;
      //     case "c2s_aim":
      //       break;
      //     case "c2s_carry":
      //       break;
      //   }
      // }
      console.log("SEND_CMD：", command);
      // console.log("SEND_CMD：", JSON.stringify(command));
      // todo: 捕获条件
      const unitIds = [this.currentUnitId];
      // 记录指令
      if (
        command &&
        command.cmd &&
        !["create", "join", "start", "continue", "pause"].includes(
          command.cmd
        ) &&
        unitIds.includes(command.id)
      ) {
        const TIMEFRAME = new Date().getTime() - this.startTime;
        this.cmdHistoryRecords.push(
          Object.assign(
            {
              TIMEFRAME
            },
            command
          )
        );
      }

      // 发送指令
      socketMap.emit(eventName, command, res => {
        // console.log("SEND_RETURN：", res);
        const { object } = res || {};
        const { reds, blues } = object || {};
        // 处理已发送的记录指令
        if (
          command &&
          Object.prototype.hasOwnProperty.call(command, "TIMEFRAME")
        ) {
          this.cmdPlayedRecords.push(command);
          this.duringTime = Math.max(this.duringTime, command.TIMEFRAME);
        }

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
