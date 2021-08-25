import AbstractIntervalTask from '../AbstractIntervalTask';
import StateStorage from '../../../Infrastructure/Storage/StateStorage';
import JiraAPI from '../../../Infrastructure/JiraAPI/JiraAPI';
import EventEmitter from '../../../Domain/EventEmitter';
import EventDict from '../../../Domain/Dictionary/EventDict';
import { showScreen } from '../../Renderer/Store/appSlice';
import ScreenDict from '../../Renderer/Screen/ScreenDict';

const { ipcRenderer } = window.require('electron');

class NotificationTask extends AbstractIntervalTask {
  static __interval

  _iteration() {
    const store = this._getStore();
    const storage = new StateStorage(store.getState().settings);
    const jiraAPI = new JiraAPI(storage);

    jiraAPI.searchIssues()
      .then(() => this._showNotification());
  }

  _showNotification() {
    const notification = new Notification('Worklog Reminder', { body: "Is's time to log time of your work" });
    const isWindowVisible = ipcRenderer.sendSync(EventDict.SYNC_IS_WINDOW_VISIBLE);

    if (!isWindowVisible) {
      this._getStore().dispatch(showScreen(ScreenDict.ISSUES));
    }

    notification.addEventListener('click', () => {
      EventEmitter.getInstance().send(EventDict.SHOW_MAIN_WINDOW);
    });
  }

  _getStore() {
    return require('../../Renderer/Store').store;
  }
}

export default NotificationTask;
