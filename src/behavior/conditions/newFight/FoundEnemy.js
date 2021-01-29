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
        const { unitId, group, target } = tick.target || {};
        if (!target) {
            return FAILURE;
        }
        return SUCCESS;
    }
}
