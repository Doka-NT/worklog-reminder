import Store from 'electron-store';

export const KEY_IS_AGENT_ENABLED = 'isAgentEnabled';
export const KEY_WINDOW_BOUNDS = 'windowBounds';

const schema = {
  isAgentEnabled: {
    type: 'boolean',
    default: true,
  },
  windowBounds: {
    type: ['object', 'null'],
    default: null,
  },
};

/**
 * @returns {Store}
 */
export const createSettings = () => new Store({ schema });
