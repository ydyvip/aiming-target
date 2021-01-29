import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class IsMoving extends Condition {
    constructor() {
        let data = {
            name: "IsMoving"
        };
        super(data);
    }
    tick(tick) {
        const { x, y } = tick.target || {};
        const lastX = tick.blackboard.get("lastX", tick.tree.id, this.id);
        const lastY = tick.blackboard.get("lastY", tick.tree.id, this.id);
        tick.blackboard.set("lastX", x, tick.tree.id, this.id);
        tick.blackboard.set("lastY", y, tick.tree.id, this.id);
        if (x === lastX && y === lastY) {
            return FAILURE;
        }
        return SUCCESS;
    }
}
