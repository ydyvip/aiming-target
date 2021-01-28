import Condition from "../core/Condition";
import { BaseNodeData } from "../interf";
import { SUCCESS, FAILURE } from "../constants";

export default class HasReceived extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "HasReceived"
    };
    super(data);
  }

  tick(tick) {
    if (tick.target.level >= this.properties.level) {
      console.log(
        `已经领取了 ${this.properties.level} 等级的奖励，不能再领取相同的奖励`
      );
      return SUCCESS;
    } else {
      console.log(`还没有领取 ${this.properties.level} 等级的奖励`);
      return FAILURE;
    }
  }
}
