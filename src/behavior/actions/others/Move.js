import Action from "../../core/Action";
import { SUCCESS } from "../../constants";
export default class Move extends Action {
    constructor() {
        let data = {
            name: "Move"
        };
        super(data);
    }
    tick(tick) {
        tick.target.node[this.properties.direction] += this.properties.len;
        return SUCCESS;
    }
}
