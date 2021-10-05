import 'onsenui';
import {
  ListHeader, ListItem, Switch, Button,
} from 'react-onsenui';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import { getMilliseconds } from '../../../../../Domain/AbstractStorage';
import EventDict from '../../../../../Domain/Dictionary/EventDict';
import StateStorage from '../../../../../Infrastructure/Storage/StateStorage';
import { selectSettings, setNotificationInterval, setUpdateInterval } from '../../../Store/settingsSlice';
import TextInput from './TextInput';

export default function OtherSettings() {
  const dispatch = useDispatch();

  const state = useSelector(selectSettings);
  const storage = new StateStorage(state);

  const isAgentEnabled = ipcRenderer.sendSync(EventDict.SYNC_IS_AGENT_ENABLED);

  const onChangeAgent = (event) => {
    ipcRenderer.send(EventDict.SET_AGENT_ENABLED, event.value);
  };

  const onNotificationIntervalChange = (e) => {
    dispatch(setNotificationInterval(getMilliseconds(e.value)));
  };

  const onUpdateIntervalChange = (e) => {
    dispatch(setUpdateInterval(getMilliseconds(e.value)));
  };

  const restoreWindowPosition = () => {
    ipcRenderer.send(EventDict.RESTORE_WINDOW_POSITION);
  };

  return (
    <>
      <ListHeader>Other settings</ListHeader>
      <ListItem>
        <div className="center">Notification interval, minutes:</div>
        <div className="right">
          <TextInput
            placeholder="Minutes between notifications"
            value={storage.getNotificationInterval(true)}
            onChange={onNotificationIntervalChange}
          />
        </div>
      </ListItem>
      <ListItem>
        <div className="center">Issue update interval, minutes:</div>
        <div className="right">
          <TextInput
            placeholder="Minutes between updates"
            value={storage.getUpdateInterval(true)}
            onChange={onUpdateIntervalChange}
          />
        </div>
      </ListItem>
      <ListItem>
        <div className="center">Send analytics data:</div>
        <div className="right">
          <Switch checked={isAgentEnabled} onChange={onChangeAgent} />
        </div>
      </ListItem>
      <ListItem>
        <div className="left" style={{ width: 'auto' }} />
        <div className="center">
          <Button modifier="quiet" class="btn-link" onClick={restoreWindowPosition}>Restore window position</Button>
        </div>
      </ListItem>
    </>
  );
}
