import mitt from "mitt";

let _instance = null;

const all = Object.create(null);
const _emitter = mitt(all);
const EventType = {
  // 环境初始化
  INITENV: "initEnv",
  // 开始推演
  START: "start",
  // 暂停推演
  PAUSE: "pause",
  // 创建房间
  CREATE: "create",
  // 加入房间
  JOIN: "join",
  // 单兵态势
  ACTORSTATE: "actorState",
  // 范围视野范围内敌人
  VIEWENEMY: "viewEnemy",
  // 武器行为
  WEAPONACTION: "weaponAction",
  // C2S控制
  CONTROLS: "controls"
};

class EventEmitter {
  constructor() {
    if (_instance) {
      return _instance;
    }

    _instance = this;
    window.EventEmitterInstance = this;
  }

  get all() {
    return all;
  }
  /**
   * 添加事件监听
   * @param {string} type
   * @param {function} handler
   * @param {object} context
   * @returns {function} bound function
   */
  on(type, handler, context) {
    // console.log("on -> type", type);
    const bound = handler.bind(context);

    _emitter.on(type, bound);

    return bound;
  }
  /**
   * 触发事件
   * @param {string} type
   * @param {any} event
   */
  emit(type, event) {
    // console.log("emit -> type", type, event);
    _emitter.emit(type, event);
  }
  /**
   * 移除事件
   * @param {string} type
   * @param {function} handler
   */
  off(type, handler) {
    _emitter.off(type, handler);
  }
  /**
   * 清空事件池
   */
  removeAll() {
    Object.keys(all).forEach(key => delete all[key]);
  }
}

const emitter = new EventEmitter();

export { EventType, emitter, EventEmitter };

export default {
  EventType,
  emitter,
  EventEmitter
};
