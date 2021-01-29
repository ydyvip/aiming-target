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
            console.info(`${unitName}: Has been slain`);
            return FAILURE;
        }
    }
}
