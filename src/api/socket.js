import io from "socket.io-client";
import { emitter, EventType } from "@/EventEmitter";
import { getQueryVariable } from "@/utils";
const LINK_ADDRESS =
  (GlobalConfig.BaseUrl || process.env.VUE_APP_SOCKET) + "combat";
const socketMap = io(LINK_ADDRESS);

const connectorId = getQueryVariable("connectorId");

socketMap.on("connect", () => {
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

socketMap.on("escaper", data => {
  emitter.emit(EventType.ESCAPER, data);
});

socketMap.on("pursuer", data => {
  emitter.emit(EventType.PURSUER, data);
});

export default socketMap;
