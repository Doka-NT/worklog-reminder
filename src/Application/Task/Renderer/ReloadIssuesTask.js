import AbstractIntervalTask from "../AbstractIntervalTask";
import EventEmitter from "../../../Domain/EventEmitter";
import EventDict from "../../../Domain/Dictionary/EventDict";

class ReloadIssuesTask extends AbstractIntervalTask {
    _iteration() {
        EventEmitter.getInstance().send(EventDict.RELOAD_ISSUES)
    }
}

export default ReloadIssuesTask;
