import Condition from "../../core/Condition";
import { BaseNodeData } from "../../interf";
import { SUCCESS, FAILURE } from "../../constants";

export default class FoundEnemy extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "FoundEnemy"
    };
    super(data);
  }

  tick(tick) {
    const { unitId, group, actorSituation = [] } = tick.target || {};
    const { enemyViewList } = actorSituation.find(
      (unit: any) => unit.actorState.id === unitId
    );
    if (!enemyViewList.length) {
      return FAILURE;
    }
    return SUCCESS;
  }
}
