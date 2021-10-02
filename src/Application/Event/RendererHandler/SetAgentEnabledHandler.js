import { createSettings, KEY_IS_AGENT_ENABLED } from '../../Settings';
import AbstractHandler from '../AbstractHandler';

export default class SetAgentEnabledHandler extends AbstractHandler {
  handle(event) {
    const settings = createSettings();

    settings.set(KEY_IS_AGENT_ENABLED, event.payload);
  }
}
