import Action from "../../core/Action";
import { SUCCESS, FAILURE } from "../../constants";
export default class FindEnemy extends Action {
    constructor() {
        let data = {
            name: "FindEnemy"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, target } = tick.target || {};
        if (!target) {
            return FAILURE;
        }
        console.warn(`${group + unitId}: 发现敌方单位 ${target.id}`);
        return SUCCESS;
    }
}
