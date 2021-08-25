/**
 * @abstract
 */
class AbstractHandler {
  /**
   * @abstract
   * @param event
   */
  handle(event) {
    throw new Error('You have to implement ::handle method')
  }
}

export default AbstractHandler
