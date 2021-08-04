import JiraAPI from "../Infrastructure/JiraAPI/JiraAPI";
import EventEmitter from "../Event/EventEmitter";
import Event from "../Domain/Dictionary/Event";
import SCREEN_DICT from "./Screen";

const jiraAPI = new JiraAPI()

class IntervalNotification
{
    static __interval

    /**
     * @param {ScreenManager} sm
     */
    constructor(sm) {
        this.sm = sm
    }

    /**
     * @param {Number} intervalSeconds
     */
    start(intervalSeconds)
    {
        IntervalNotification.__interval = setInterval(this._iteration.bind(this), intervalSeconds)
    }

    stop()
    {
        if (!IntervalNotification.__interval) {
            return
        }

        clearInterval(IntervalNotification.__interval);
    }

    restart(intervalSeconds)
    {
        this.stop()
        this.start(intervalSeconds)
    }

    _iteration()
    {
        jiraAPI.searchIssues()
            .then(this._showNotification)
    }

    _showNotification() {
        const notification = new Notification("Worklog Reminder", {body: "Is's time to log time of your work" });

        notification.addEventListener('click', () => {
            EventEmitter.getInstance().send(Event.SHOW_MAIN_WINDOW)
            this.sm.showScreen(SCREEN_DICT.ISSUES)
        });
    }
}

export default IntervalNotification
