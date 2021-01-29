import Action from "../../core/Action";
import { SUCCESS, FAILURE } from "../../constants";
export default class SearchEnemy extends Action {
    constructor() {
        let data = {
            name: "SearchEnemy"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, target } = tick.target || {};
        if (!target) {
            return FAILURE;
        }
        // console.info(
        //   `%c${group + unitId}: Found ${target.id}`,
        //   `color: ${group.slice(0, -1)}; font-size: 14px;`
        // );
        return SUCCESS;
    }
}