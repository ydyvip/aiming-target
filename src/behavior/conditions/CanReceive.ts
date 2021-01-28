import Condition from "../core/Condition";
import { BaseNodeData } from "../interf";
import { SUCCESS, FAILURE } from "../constants";

export default class CanReceive extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "CanReceive"
    };
    super(data);
  }

  tick(tick) {
    if (tick.target.ReceivingCondition >= this.properties.ReceivingCondition) {
      console.log(
        `积分为${tick.target.ReceivingCondition}，满足条件（${this.properties.ReceivingCondition}）`
      );
      return SUCCESS;
    } else {
      console.log(
        `积分为${tick.target.ReceivingCondition}，不满足条件（${this.properties.ReceivingCondition}）`
      );
      return FAILURE;
    }
  }
}
