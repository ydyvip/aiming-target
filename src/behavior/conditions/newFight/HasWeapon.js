import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class HasWeapon extends Condition {
    constructor() {
        let data = {
            name: "HasWeapon"
        };
        super(data);
    }
    tick(tick) {
        const { unitId, group, weaponType } = tick.target || {};
        if (["PISTOL", "RIFLE"].includes(weaponType)) {
            console.warn(`${group + unitId}: 有${weaponType}武器`);
            return SUCCESS;
        }
        return FAILURE;
    }
}
