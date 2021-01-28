import Action from "../../core/Action";
import { RUNNING, SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";
export default class LoadAmmo extends Action {
    constructor() {
        let data = {
            name: "LoadAmmo"
        };
        super(data);
    }
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        const { unitId, group, loadingTime = 0, timeSpeed = 1000 } = tick.target || {};
        const isReloading = tick.blackboard.get("isReloading", tick.tree.id, this.id);
        if (isReloading) {
            return RUNNING;
        }
        tick.blackboard.set("isReloading", true, tick.tree.id, this.id);
        // 换弹匣
        socketMap.emit("controls", {
            id: unitId,
            cmd: "c2s_load_ammunition"
        }, () => {
            setTimeout(() => {
                console.warn("换弹完毕！！！");
                tick.blackboard.set("isReloading", false, tick.tree.id, this.id);
            }, loadingTime / timeSpeed);
        });
        console.warn(`${group + unitId}: 换弹匣,耗时${loadingTime / timeSpeed}`);
        return SUCCESS;
    }
}
