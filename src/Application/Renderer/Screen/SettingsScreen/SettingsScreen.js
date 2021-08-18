import 'onsenui'
import { Button, List, Page } from 'react-onsenui'
import CredentialsSettings from './components/CredentialsSettings'
import OtherSettings from './components/OtherSettings'
import SettingsToolbar from './components/SettingsToolbar'
import './style.less'


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

                <Button className="btn-extra-large">Save</Button>
            </Page>
        </section>
    )
}