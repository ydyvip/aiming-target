import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class HasWeapon extends Condition {
    constructor({ weaponTypes = "HAND" } = {}) {
        let data = {
            name: "HasWeapon",
            title: "HasWeapon",
            properties: { weaponTypes: "HAND" }
        };
        super(data);
        this.weaponTypes = weaponTypes.split(",");
    }
    tick(tick) {
        const { unitId, group, weaponType } = tick.target || {};
        if (this.weaponTypes.includes(weaponType)) {
            // console.info(`${group + unitId}: Has carry a ${weaponType}`);
            return SUCCESS;
        }
        return FAILURE;
    }
}
