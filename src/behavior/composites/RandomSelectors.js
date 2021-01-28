import Composite from "../core/Composite";
import { SUCCESS, FAILURE } from "../constants";
export default class RandomSelectors extends Composite {
    constructor(data) {
        data.name = "RandomSelectors";
        super(data);
    }
    tick(tick) {
        for (let index = this.children.length - 1; index >= 0; index--) {
            let new_index = Math.round(Math.random() * index);
            let status = this.children[new_index]._execute(tick);
            if (status === SUCCESS) {
                return SUCCESS;
            }
            this.swap(index, new_index);
        }
        return FAILURE;
    }
    swap(index1, index2) {
        let tem = this.children[index1];
        this.children[index1] = this.children[index2];
        this.children[index2] = tem;
    }
}
