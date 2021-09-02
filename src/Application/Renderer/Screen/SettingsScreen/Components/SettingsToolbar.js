import { Toolbar, BackButton } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import { showScreen } from '../../../Store/appSlice';
import { selectIsSettingsFilled } from '../../../Store/settingsSlice';
import ScreenDict from '../../ScreenDict';

export default function SettingsToolbar() {
  const dispatch = useDispatch();

  const onBackClick = () => {
    dispatch(showScreen(ScreenDict.CHECK_TOKEN));
  };

  return (
    <Toolbar>
      <div className="left">
        <BackButton onClick={onBackClick}>Back</BackButton>
      </div>
      <div className="center">Settings</div>
    </Toolbar>
  );
}
