import Action from "../../core/Action";
import { SUCCESS } from "../../constants";
import socketMap from "../../../api/socket";
export default class SwitchWeapon extends Action {
    constructor({ weaponIndex = 0 } = {}) {
        let data = {
            name: "SwitchWeapon",
            title: "SwitchWeapon",
            properties: { weaponIndex: 0 }
        };
        super(data);
        this.weaponIndex = weaponIndex;
    }
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        const { unitId } = tick.target || {};
        // 换武器
        socketMap.emit("controls", {
            id: unitId,
            cmd: "c2s_switch_weapon",
            weapon_index: this.weaponIndex
        });
        return SUCCESS;
    }
}
