import Condition from "../../core/Condition";
import { SUCCESS, FAILURE } from "../../constants";
export default class CanAttack extends Condition {
    constructor() {
        let data = {
            name: "CanAttack"
        };
        super(data);
    }
    tick(tick) {
        const { weaponType, ammunitionAmount } = tick.target || {};
        if ((["PISTOL", "RIFLE"].includes(weaponType) && ammunitionAmount > 0) ||
            "KNIFE" === weaponType) {
            return SUCCESS;
        }
        return FAILURE;
    }
}
