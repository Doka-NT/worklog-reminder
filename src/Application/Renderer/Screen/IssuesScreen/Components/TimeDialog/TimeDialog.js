import { Button, Card, Dialog } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../Components/Input';
import ProgressLine from '../../../../Components/ProgressLine';
import { selectNotificationInterval } from '../../../../Store/settingsSlice';
import {
  addIssueWorklogAsync,
  selectCurrentIssue,
  selectIsTimeProgressVisible,
  setCurrentIssue,
} from '../../slice';
import {
  resetTime,
  selectHours,
  selectMinutes,
  setHours,
  setMinutes,
} from './slice';
import './style.less';

const timeMap = {
  5: '5m',
  10: '10m',
  15: '15m',
  30: '30m',
  60: '1h',
  90: '1h 30m',
  120: '2h',
  150: '2h 30m',
  180: '3h',
  210: '3h 30m',
  240: '4h',
  300: '5h',
};

export default function TimeDialog() {
  const dispatch = useDispatch();

  const issue = useSelector(selectCurrentIssue);
  const isProgressBarVisible = useSelector(selectIsTimeProgressVisible);
  const notificationInterval = useSelector(selectNotificationInterval) / 1000 / 60;

  const hours = useSelector(selectHours);
  const minutes = useSelector(selectMinutes);

  const notificationHours = Math.floor(notificationInterval / 60);
  const notificationMinutes = notificationInterval - (notificationHours * 60);

  const isOpen = issue !== null;

  const onCancel = () => dispatch(setCurrentIssue(null));

  const onClick = (btnMinutes) => {
    dispatch(addIssueWorklogAsync(btnMinutes));
  };

  const onMinutesChange = (value) => {
    dispatch(setMinutes(value));
  };

  const saveMinutesToWorklog = () => {
    const resMinutes = !hours && !minutes ? notificationInterval : Number(minutes) + Number(hours) * 60;

    dispatch(addIssueWorklogAsync(resMinutes));
    dispatch(resetTime());
  };

  const buttons = Object.entries(timeMap)
    .map((entry) => (
      <Button
        key={entry[0]}
        modifier="outline"
        className="time-button"
        onClick={() => onClick(entry[0])}
      >
        {entry[1]}
      </Button>
    ));

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={onCancel}
      isCancelable
    >
      <Card>
        <ProgressLine isVisible={isProgressBarVisible} />

        <div className="title">
          How much time you spent?
        </div>
        <div className="content">
          <div style={{ textAlign: 'justify' }}>
            {buttons}
          </div>

          <div className="input-block">
            <Input
              isFocused={isOpen}
              type="number"
              min="0"
              modifier="underbar"
              placeholder={`${notificationHours}h`}
              onChange={(e) => dispatch(setHours(e.value))}
              value={hours || ''}
            />
            <span className="input-suffix">h</span>
            <Input
              type="number"
              min="0"
              modifier="underbar"
              placeholder={`${notificationMinutes}m`}
              onEnter={saveMinutesToWorklog}
              onChange={(e) => onMinutesChange(e.value)}
              onKeyUp={(e) => onMinutesChange(e.target.value)}
              value={minutes || ''}
            />
            <span className="input-suffix">min</span>
          </div>

          <Button
            onClick={saveMinutesToWorklog}
            className="button button--large"
          >
            Save
          </Button>
        </div>
      </Card>
    </Dialog>
  );
}
