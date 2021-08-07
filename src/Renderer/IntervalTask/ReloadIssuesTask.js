import AbstractTask from "./AbstractTask";
import Event from "../../Domain/Dictionary/Event";
import EventEmitter from "../../Event/EventEmitter";

class ReloadIssuesTask extends AbstractTask
{
    _iteration() {
        EventEmitter.getInstance().send(Event.RELOAD_ISSUES)
    }
}

export default ReloadIssuesTask
