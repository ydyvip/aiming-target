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
    const { unitId, group, target } = tick.target || {};
    if (!target) {
      return FAILURE;
    }
    return SUCCESS;
  }
}
