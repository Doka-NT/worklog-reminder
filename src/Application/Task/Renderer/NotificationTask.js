import AbstractIntervalTask from '../AbstractIntervalTask'
import StateStorage from '../../../Infrastructure/Storage/StateStorage'
import JiraAPI from '../../../Infrastructure/JiraAPI/JiraAPI'
import EventEmitter from '../../../Domain/EventEmitter'
import EventDict from '../../../Domain/Dictionary/EventDict'

class NotificationTask extends AbstractIntervalTask {
    static __interval

    _iteration() {
        const store = require('../../Renderer/Store').store
        const storage = new StateStorage(store.getState().settings)
        const jiraAPI = new JiraAPI(storage)

        jiraAPI.searchIssues()
            .then(() => this._showNotification())
    }

    _showNotification() {
        const notification = new Notification("Worklog Reminder", {body: "Is's time to log time of your work"});

        notification.addEventListener('click', () => {
            EventEmitter.getInstance().send(EventDict.SHOW_MAIN_WINDOW)
        });
    }
}

export default NotificationTask;
