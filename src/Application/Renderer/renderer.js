import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './Store';
import NotificationTask from '../Task/Renderer/NotificationTask';
import ReloadIssuesTask from '../Task/Renderer/ReloadIssuesTask';
import StateStorage from '../../Infrastructure/Storage/StateStorage';
import createAgent from '../../Infrastructure/Monitoring';

createAgent().startRendererAgent();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

const storage = new StateStorage(store.getState().settings);

new NotificationTask().start(storage.getNotificationInterval(), store);
new ReloadIssuesTask().start(storage.getUpdateInterval());
