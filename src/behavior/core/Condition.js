import BaseNode from "./BaseNode";
/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends BaseNode
 **/
export default class Condition extends BaseNode {
    /**
     * Creates an instance of Condition.
     * @param {Object} options
     * @param {Object} options.name Node name. Default to `Condition`.
     * @param {String} options.title
     * @param {Object} options.properties
     * @memberof Condition
     */
    constructor(data) {
        data.category = "condition"; //CONDITION;
        super(data);
    }
}
