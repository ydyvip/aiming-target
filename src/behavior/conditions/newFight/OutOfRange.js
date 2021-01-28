import Condition from "../../core/Condition";
import { FAILURE, SUCCESS } from "../../constants";
export default class OutOfRange extends Condition {
    constructor() {
        let data = {
            name: "OutOfRange"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, x, y, target, attackDistance, mapScale, actorSituation } = tick.target || {};
        if (!target) {
            return FAILURE;
        }
        // 获取敌方单位
        const { actorState } = actorSituation.find((unit) => unit.actorState.id === target.id);
        const detaX = x / mapScale - actorState.x;
        const detaY = y / mapScale - actorState.y;
        const d = detaX * detaX + detaY * detaY;
        const r = attackDistance * attackDistance;
        if (d < r) {
            return FAILURE;
        }
        console.warn(`${group + unitId}: 超出射程`);
        return SUCCESS;
    }
}
