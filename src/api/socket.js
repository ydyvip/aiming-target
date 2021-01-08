import io from "socket.io-client";
import { emitter, EventType } from "@/EventEmitter";
import { getQueryVariable } from "@/utils";
console.log(process.env);
const LINK_ADDRESS =
  (GlobalConfig.BaseUrl || process.env.VUE_APP_SOCKET) + "combat";
const socketMap = io(LINK_ADDRESS);

const connectorId = getQueryVariable("connectorId");

socketMap.on("connect", () => {
  // 连接创建后发送
  socketMap.emit("bind", {
    uuid: connectorId
  });
});

// 环境信息初始化获取
socketMap.on("initEnv", data => {
  emitter.emit(EventType.INITENV, data);
});

socketMap.on("start", data => {
  emitter.emit(EventType.START, data);
});

socketMap.on("pause", data => {
  emitter.emit(EventType.PAUSE, data);
});

socketMap.on("create", data => {
  emitter.emit(EventType.CREATE, data);
});

socketMap.on("join", data => {
  emitter.emit(EventType.JOIN, data);
});

// 单兵态势
socketMap.on("actorState", data => {
  emitter.emit(EventType.ACTORSTATE, data);
});
// 范围视野范围内敌人
socketMap.on("viewEnemy", data => {
  emitter.emit(EventType.VIEWENEMY, data);
});
// 武器行为
socketMap.on("weaponAction", data => {
  emitter.emit(EventType.WEAPONACTION, data);
});
// 转向行为
socketMap.on("rotationAction", data => {
  emitter.emit(EventType.ROTATIONACTION, data);
});
// C2S控制
socketMap.on("controls", data => {
  emitter.emit(EventType.CONTROLS, data);
});

export default socketMap;
