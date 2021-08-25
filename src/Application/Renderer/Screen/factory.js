import CheckTokenScreen from './CheckTokenScreen/CheckTokenScreen';
import IssuesScreen from './IssuesScreen/IssuesScreen';
import ScreenDict from './ScreenDict';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';

export default function createScreen(screenName) {
  let screen;

  switch (screenName) {
    case ScreenDict.WELCOME:
      screen = <WelcomeScreen />;
      break;
    case ScreenDict.CHECK_TOKEN:
      screen = <CheckTokenScreen />;
      break;
    case ScreenDict.SETTINGS:
      screen = <SettingsScreen />;
      break;
    case ScreenDict.ISSUES:
      screen = <IssuesScreen />;
      break;
    default:
      screen = <CheckTokenScreen />;
  }

  return screen;
}
