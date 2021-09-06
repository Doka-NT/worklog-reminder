/**
 * @abstract
 */
export default class AbstractIpcRenderer {
  /**
   * @abstract
   * @param {string} eventName 
   */
  send(eventName) {}
  /**
   * @abstract
   * @param {string} eventName 
   */
  sendSync(eventName) {}
}