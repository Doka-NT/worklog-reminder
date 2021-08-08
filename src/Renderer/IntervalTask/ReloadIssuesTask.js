import AbstractTask from "./AbstractTask";
import EventDict from "../../Domain/Dictionary/EventDict";
import EventEmitter from "../../Event/EventEmitter";

class ReloadIssuesTask extends AbstractTask
{
    _iteration() {
        EventEmitter.getInstance().send(EventDict.RELOAD_ISSUES)
    }
}

export default ReloadIssuesTask
