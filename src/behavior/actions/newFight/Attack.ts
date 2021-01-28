import Action from "../../core/Action";
import { BaseNodeData } from "../../interf";
import { SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";

export default class Attack extends Action {
  constructor() {
    let data: BaseNodeData = {
      name: "Attack"
    };
    super(data);
  }

  tick(tick) {
    const { unitId, group, target } = tick.target || {};
    // 攻击目标
    socketMap.emit("controls", {
      id: unitId,
      cmd: "c2s_attack"
    });
    console.warn(`${group + unitId}: attack ${target.id}`);

    return SUCCESS;
  }
}
