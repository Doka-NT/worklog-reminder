import os from 'os'
import { app } from 'electron'
import AbstractHandler from "../AbstractHandler";

export default class HideMacOsDockHandler extends AbstractHandler {
  handle(event) {
    if (os.platform() === 'darwin') {
      app.dock.hide()
    }
  }
}
