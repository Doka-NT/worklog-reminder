import 'onsenui'
import { Button, List, Page } from 'react-onsenui'
import { useDispatch } from 'react-redux'
import { showScreen } from '../../appSlice'
import ScreenDict from '../ScreenDict'
import CredentialsSettings from './Components/CredentialsSettings'
import OtherSettings from './Components/OtherSettings'
import SettingsToolbar from './Components/SettingsToolbar'
import './style.less'

export default function SettingsScreen() {
    const dispatch = useDispatch()
    const onSaveClick = () => dispatch(showScreen(ScreenDict.CHECK_TOKEN))

    return (
        <section className="screen screen__access-token">
            <Page
                renderToolbar={() => <SettingsToolbar />}
            >
                <List>
                    <CredentialsSettings />
                    <OtherSettings />
                </List>

                <Button
                    className="btn-extra-large"
                    onClick={onSaveClick}
                >Save</Button>
            </Page>
        </section>
    )
}