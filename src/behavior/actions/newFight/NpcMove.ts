import Action from "../../core/Action";
import { BaseNodeData } from "../../interf";
import { FAILURE, SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";

export default class NpcMove extends Action {
  constructor() {
    let data: BaseNodeData = {
      name: "NpcMove"
    };
    super(data);
  }

  tick(tick) {
    const {
      unitId,
      group,
      x,
      y,
      target,
      attackDistance = 0,
      mapScale,
      actorSituation
    } = tick.target || {};
    if (!target) {
      return FAILURE;
    }
    // 获取敌方单位
    const { actorState } = actorSituation.find(
      (unit: any) => unit.actorState.id === target.id
    );

    // 射程
    const r: number = attackDistance;
    // y 坐标的差值
    const detaY: number = y / mapScale - actorState.y;
    // 应该移动的距离
    const mv: number =
      Math.abs(x / mapScale - actorState.x) -
      Math.sqrt(Math.abs(r * r - detaY * detaY));
    // 中点坐标
    const cx: number = Math.abs(x / mapScale + actorState.x) / 2;
    const cy: number = Math.abs(y / mapScale + actorState.y) / 2;
    // console.warn(`${mv} ${r} ${detaY}center: X:${cx} Y:${cy}`);
    // 发送移动指令
    if (!isNaN(mv)) {
      socketMap.emit("controls", {
        id: unitId,
        cmd: "c2s_move",
        position: {
          x: cx,
          y: cy
        }
      });
      console.warn(`${group + unitId}: move ${mv}`);
      return SUCCESS;
    }
  }
}
