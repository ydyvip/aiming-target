import Action from "../../core/Action";
import { SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";
export default class Attack extends Action {
    constructor() {
        let data = {
            name: "Attack"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, targetId } = tick.target || {};
        // 攻击目标
        socketMap.emit("controls", {
            id: unitId,
            cmd: "c2s_attack"
        });
        console.info(`%c${group + unitId}: Attacking ${targetId}`, `color: ${group.slice(0, -1)}; font-size: 14px;`);
        return SUCCESS;
    }
}
