import Action from "../../core/Action";
import { BaseNodeData } from "../../interf";
import { FAILURE, RUNNING, SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";

export default class Rotation extends Action {
  private direct: Number; // 1右转0左转
  private angle: Number; // 角度
  constructor({ direct = 1, angle = 0 } = {}) {
    let data: BaseNodeData = {
      name: "Rotation"
    };
    super(data);
    this.direct = direct;
    this.angle = angle;
  }

  /**
   * Tick method.
   * @method tick
   * @param {b3.Tick} tick A tick instance.
   * @return {Constant} A state constant.
   **/
  tick(tick) {
    const { unitId } = tick.target || {};

    // 单位转向
    socketMap.emit("controls", {
      id: unitId,
      cmd: "c2s_rotation",
      direct: this.direct,
      angle: this.angle
    });
    return SUCCESS;
  }
}
