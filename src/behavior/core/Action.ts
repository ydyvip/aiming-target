import BaseNode from "./BaseNode";
import { ACTION } from "../constants";
import { BaseNodeData } from "../interf";

/**
 * Action is the base class for all action nodes. Thus, if you want to create
 * new custom action nodes, you need to inherit from this class. For example,
 * take a look at the Runner action:
 *
 *     class Runner extends b3.Action {
 *       constructor(){
 *         super({name: 'Runner'});
 *       }
 *       tick(tick) {
 *         return b3.RUNNING;
 *       }
 *     };
 *
 * @module b3
 * @class Action
 * @extends BaseNode
 **/

export default class Action extends BaseNode {
  /**
   * Creates an instance of Action.
   * @param {Object} options
   * @param {String} options.name Node name. Default to `Action`.
   * @param {String} options.title
   * @param {Object} options.properties
   * @memberof Action
   */
  constructor(data: BaseNodeData) {
    data.category = "action"; // ACTION
    super(data);
  }
}
