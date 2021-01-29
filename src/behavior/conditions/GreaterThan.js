import Action from "../core/Action";
import { SUCCESS, FAILURE } from "../constants";
export default class GreaterThan extends Action {
    constructor() {
        let data = {
            name: "GreaterThan"
        };
        super(data);
    }
    tick(tick) {
        const target = tick.target || {};
        if (target[this.properties.key] > this.properties.value) {
            return SUCCESS;
        }
        return FAILURE;
    }
}
