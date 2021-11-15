import 'onsenui/css/onsen-css-components.css';
import 'onsenui/css/onsenui.css';
import { useSelector } from 'react-redux';
import './App.less';
import createScreen from './Screen/factory';
import ScreenDict from './Screen/ScreenDict';
import { selectScreenName } from './Store/appSlice';
import { selectIsOnboardingPassed } from './Store/settingsSlice';

export default function App() {
  const screenName = useSelector(selectScreenName);
  const isOnboardingPassed = useSelector(selectIsOnboardingPassed);

  const initialScreen = !isOnboardingPassed
    ? ScreenDict.WELCOME
    : ScreenDict.CHECK_TOKEN;

  const screen = createScreen(screenName || initialScreen);

  return (
    <div>
      <div className="window-drag-area" />
      {screen}
    </div>
  );
}
