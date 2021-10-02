import Store from 'electron-store';

export const KEY_IS_AGENT_ENABLED = 'isAgentEnabled';

const schema = {
  isAgentEnabled: {
    type: 'boolean',
    default: true,
  },
};

/**
 * @returns {Store}
 */
export const createSettings = () => new Store({ schema });
