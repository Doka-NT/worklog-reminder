import 'onsenui';
import { List, Page } from 'react-onsenui';
import CredentialsSettings from './Components/CredentialsSettings';
import OtherSettings from './Components/OtherSettings';
import SettingsToolbar from './Components/SettingsToolbar';
import './style.less';

export default function SettingsScreen() {
  return (
    <section className="screen screen__access-token">
      <Page
        renderToolbar={() => <SettingsToolbar />}
      >
        <List>
          <CredentialsSettings />
          <OtherSettings />
        </List>
      </Page>
    </section>
  );
}
