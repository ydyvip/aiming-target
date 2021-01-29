import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class FoundEnemy extends Condition {
    constructor() {
        let data = {
            name: "FoundEnemy"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, actorSituation = [] } = tick.target || {};
        const { enemyViewList } = actorSituation.find((unit) => unit.actorState.id === unitId);
        if (!enemyViewList.length) {
            return FAILURE;
        }
        return SUCCESS;
    }
}
