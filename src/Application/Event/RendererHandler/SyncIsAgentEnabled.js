import { createSettings, KEY_IS_AGENT_ENABLED } from "../../Settings";
import AbstractHandler from "../AbstractHandler";

export default class SyncIsAgentEnabled extends AbstractHandler {
  handle() {
    const settings = createSettings();

    console.log('SyncIsAgentEnabled', settings.get(KEY_IS_AGENT_ENABLED))
    return settings.get(KEY_IS_AGENT_ENABLED);
  }
}