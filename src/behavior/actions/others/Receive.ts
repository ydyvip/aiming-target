import Action from "../../core/Action";
import { BaseNodeData } from "../../interf";
import { SUCCESS } from "../../constants";

export default class Receive extends Action {
  constructor() {
    let data: BaseNodeData = {
      name: "Receive"
    };
    super(data);
  }

  tick(tick) {
    console.log(`领取 ${this.properties.level} 等级奖励`);
    tick.target.level = this.properties.level;
    return SUCCESS;
  }
}
