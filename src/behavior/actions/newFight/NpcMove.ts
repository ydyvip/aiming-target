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
    const { unitId, group, actorSituation = [] } = tick.target || {};

    // 获取当前单位
    const { actorState, curWeapon, enemyViewList } = actorSituation.find(
      (unit: any) => unit.actorState.id === unitId
    );
    const { attackDistance } = curWeapon || {};
    const { x, y } = actorState || {};
    if (!enemyViewList.length) {
      return FAILURE;
    }
    // 获取敌方单位
    const target = actorSituation.find(
      (unit: any) => unit.actorState.id === enemyViewList[0]
    );

    // 射程
    const r: number = attackDistance;
    // y 坐标的差值
    const detaY: number = y - target.actorState.y;
    // 应该移动的距离
    const mv: number =
      Math.abs(x - target.actorState.x) -
      Math.sqrt(Math.abs(r * r - detaY * detaY));
    // 中点坐标
    const cx: number = Math.abs(x + target.actorState.x) / 2;
    const cy: number = Math.abs(y + target.actorState.y) / 2;

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
      console.info(`${group + unitId}: Distance shows ${mv} M from target`);
      return SUCCESS;
    }
  }
}
