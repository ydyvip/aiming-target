import Condition from "../../core/Condition";
import { BaseNodeData } from "../../interf";
import { FAILURE, SUCCESS } from "../../constants";

export default class OutOfRange extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "OutOfRange"
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
      attackDistance,
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
    const detaX = x / mapScale - actorState.x;
    const detaY = y / mapScale - actorState.y;
    const d = detaX * detaX + detaY * detaY;
    const r = attackDistance * attackDistance;

    if (d < r) {
      return FAILURE;
    }
    console.info(`${group + unitId}: Out of range`);
    return SUCCESS;
  }
}
