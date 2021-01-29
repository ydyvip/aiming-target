import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class CanAttack extends Condition {
    constructor() {
        let data = {
            name: "CanAttack"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, actorSituation = [] } = tick.target || {};
        // 获取当前单位
        const { curWeapon } = actorSituation.find((unit) => unit.actorState.id === unitId);
        const { type, ammunitionAmount } = curWeapon || {};
        if ((["PISTOL", "RIFLE"].includes(type) && ammunitionAmount > 0) ||
            "KNIFE" === type) {
            return SUCCESS;
        }
        return FAILURE;
    }
}
