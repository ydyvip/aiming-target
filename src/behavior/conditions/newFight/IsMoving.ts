import Condition from "../../core/Condition";
import { BaseNodeData } from "../../interf";
import { SUCCESS, FAILURE } from "../../constants";

export default class IsMoving extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "IsMoving"
    };
    super(data);
  }

  tick(tick) {
    const { unitId, actorSituation = [] } = tick.target || {};
    // 获取当前单位
    const { actorState } = actorSituation.find(
      (unit: any) => unit.actorState.id === unitId
    );
    const { x, y } = actorState || {};
    const lastX = tick.blackboard.get("lastX", tick.tree.id, this.id);
    const lastY = tick.blackboard.get("lastY", tick.tree.id, this.id);
    tick.blackboard.set("lastX", x, tick.tree.id, this.id);
    tick.blackboard.set("lastY", y, tick.tree.id, this.id);
    if (x === lastX && y === lastY) {
      return FAILURE;
    }
    return SUCCESS;
  }
}
