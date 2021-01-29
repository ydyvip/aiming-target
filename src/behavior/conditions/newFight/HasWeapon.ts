import Condition from "../../core/Condition";
import { BaseNodeData } from "../../interf";
import { SUCCESS, FAILURE } from "../../constants";

export default class HasWeapon extends Condition {
  private weaponTypes: String[];
  constructor({ weaponTypes = "HAND" } = {}) {
    let data: BaseNodeData = {
      name: "HasWeapon",
      title: "HasWeapon",
      properties: { weaponTypes: "HAND" }
    };
    super(data);
    this.weaponTypes = weaponTypes.split(",");
  }

  tick(tick) {
    const { unitId, group, actorSituation = [] } = tick.target || {};
    // 获取当前单位
    const { curWeapon } = actorSituation.find(
      (unit: any) => unit.actorState.id === unitId
    );
    const { type } = curWeapon || {};
    if (this.weaponTypes.includes(type)) {
      // console.info(`${group + unitId}: Has carry a ${type}`);
      return SUCCESS;
    }

    return FAILURE;
  }
}
