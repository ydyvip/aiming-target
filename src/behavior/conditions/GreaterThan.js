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
        if (tick.target.node[this.properties.direction] > this.properties.value) {
            return SUCCESS;
        }
        return FAILURE;
    }
}
