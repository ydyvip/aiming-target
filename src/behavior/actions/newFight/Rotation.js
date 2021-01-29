import Action from "../../core/Action";
import { SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";
export default class Rotation extends Action {
    constructor({ direct = 1, angle = 0 } = {}) {
        let data = {
            name: "Rotation"
        };
        super(data);
        this.direct = direct;
        this.angle = angle;
    }
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        const { unitId } = tick.target || {};
        // 单位转向
        socketMap.emit("controls", {
            id: unitId,
            cmd: "c2s_rotation",
            direct: this.direct,
            angle: this.angle
        });
        return SUCCESS;
    }
}
