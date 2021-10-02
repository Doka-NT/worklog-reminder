import { createSettings, KEY_IS_AGENT_ENABLED } from '../../Settings';
import AbstractHandler from '../AbstractHandler';

export default class SyncIsAgentEnabled extends AbstractHandler {
  handle() {
    return createSettings().get(KEY_IS_AGENT_ENABLED);
  }
}
