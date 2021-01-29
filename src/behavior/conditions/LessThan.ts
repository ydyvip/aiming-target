import Condition from "../core/Condition";
import { BaseNodeData } from "../interf";
import { SUCCESS, FAILURE } from "../constants";

export default class LessThan extends Condition {
  constructor() {
    let data: BaseNodeData = {
      name: "LessThan"
    };
    super(data);
  }

  tick(tick) {
    const target = tick.target || {};
    if (target[this.properties.key] < this.properties.value) {
      return SUCCESS;
    }
    return FAILURE;
  }
}
