import WindowManager from "../../UI/WindowManager";
import AbstractHandler from "../AbstractHandler";


export default class SyncIsWindowVisible extends AbstractHandler {
  /**
   * @param event
   * @return {boolean}
   */
  handle(event) {
    return WindowManager.getInstance().getMainWindow().isVisible()
  }
}
