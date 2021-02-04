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
        const { unitId, group, actorSituation = [] } = tick.target || {};
        // 获取当前单位
        const { actorState, curWeapon, enemyViewList } = actorSituation.find((unit) => unit.actorState.id === unitId);
        const { attackDistance } = curWeapon || {};
        const { x, y } = actorState || {};
        if (!enemyViewList.length) {
            return FAILURE;
        }
        // 获取敌方单位
        const target = actorSituation.find((unit) => unit.actorState.id === enemyViewList[0]);
        const detaX = x - target.actorState.x;
        const detaY = y - target.actorState.y;
        const d = detaX * detaX + detaY * detaY;
        const r = attackDistance * attackDistance;
        if (d < r) {
            return FAILURE;
        }
        console.info(`${group + unitId}: Out of range`);
        return SUCCESS;
    }
}
