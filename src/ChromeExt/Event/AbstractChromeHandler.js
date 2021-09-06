import AbstractHandler from "../../Application/Event/AbstractHandler";

export default class AbstractChromeHandler extends AbstractHandler {
  /**
   * @abstract
   * @param {object} event 
   * @param {CallableFunction} resultCallback 
   */
  handle(event, resultCallback) {
    super.handle(event)
  }
}