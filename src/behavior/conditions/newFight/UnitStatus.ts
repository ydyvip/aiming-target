import Condition from "../../core/Condition";
import { BaseNodeData } from "../../interf";
import { SUCCESS, FAILURE } from "../../constants";

export default class UnitStatus extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "UnitStatus"
    };
    super(data);
  }

  tick(tick) {
    const { unitId, actorSituation = [] } = tick.target || {};
    // 获取当前单位
    const { actorState } = actorSituation.find(
      (unit: any) => unit.actorState.id === unitId
    );
    if (actorState.status === this.properties.status) {
      return SUCCESS;
    } else {
      return FAILURE;
    }
  }
}
