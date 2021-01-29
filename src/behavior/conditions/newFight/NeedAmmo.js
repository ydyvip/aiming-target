import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class NeedAmmo extends Condition {
    constructor() {
        let data = {
            name: "NeedAmmo"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, actorSituation = [] } = tick.target || {};
        // 获取当前单位
        const { curWeapon } = actorSituation.find((unit) => unit.actorState.id === unitId);
        const { ammunitionAmount } = curWeapon || {};
        if (ammunitionAmount === 0) {
            console.info(`${group + unitId}: Needs ammo`);
            return SUCCESS;
        }
        return FAILURE;
    }
}
