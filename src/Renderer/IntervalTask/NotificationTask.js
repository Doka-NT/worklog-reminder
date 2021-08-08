import JiraAPI from "../../Infrastructure/JiraAPI/JiraAPI";
import EventEmitter from "../../Event/EventEmitter";
import EventDict from "../../Domain/Dictionary/EventDict";
import SCREEN_DICT from "../Screen";
import AbstractTask from "./AbstractTask";

const jiraAPI = new JiraAPI()

class NotificationTask extends AbstractTask
{
    static __interval

    /**
     * @param {ScreenManager} sm
     */
    constructor(sm) {
        super()
        this.sm = sm
    }

    _iteration()
    {
        jiraAPI.searchIssues()
            .then(() => this._showNotification())
    }

    _showNotification() {
        const notification = new Notification("Worklog Reminder", {body: "Is's time to log time of your work" });

        notification.addEventListener('click', () => {
            EventEmitter.getInstance().send(EventDict.SHOW_MAIN_WINDOW)
            this.sm.showScreen(SCREEN_DICT.ISSUES)
        });
    }
}

export default NotificationTask
