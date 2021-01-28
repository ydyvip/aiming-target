import Condition from "../../core/Condition";
import { BaseNodeData } from "../../interf";
import { SUCCESS, FAILURE } from "../../constants";

export default class NeedAmmo extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "NeedAmmo"
    };
    super(data);
  }

  tick(tick) {
    const { unitId, group, ammunitionAmount } = tick.target || {};

    if (ammunitionAmount === 0) {
      console.warn(`${group + unitId}: 弹匣已空`);
      return SUCCESS;
    }

    return FAILURE;
  }
}
