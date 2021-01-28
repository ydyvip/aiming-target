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
    const { status } = tick.target || {};
    if (status === this.properties.status) {
      return SUCCESS;
    } else {
      return FAILURE;
    }
  }
}
