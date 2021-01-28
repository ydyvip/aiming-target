import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class IsAlive extends Condition {
    constructor() {
        let data = {
            name: "IsAlive"
        };
        super(data);
    }
    tick(tick) {
        const { unitName, hp } = tick.target || {};
        if (hp > 0) {
            return SUCCESS;
        }
        else {
            console.log(`${unitName}: 已阵亡`);
            return FAILURE;
        }
    }
}
