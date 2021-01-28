import Action from "../core/Action";
import { BaseNodeData } from "../interf";
import { SUCCESS, FAILURE } from "../constants";

export default class GreaterThan extends Action {
  constructor() {
    let data: BaseNodeData = {
      name: "GreaterThan"
    };
    super(data);
  }

  tick(tick) {
    if (tick.target.node[this.properties.direction] > this.properties.value) {
      return SUCCESS;
    }
    return FAILURE;
  }
}
