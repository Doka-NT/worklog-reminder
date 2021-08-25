
import 'onsenui/css/onsen-css-components.css'
import 'onsenui/css/onsenui.css'
import { useSelector } from 'react-redux'
import './App.less'
import { selectScreenName } from './Store/appSlice'
import createScreen from './Screen/factory'
import { selectSettings } from './Store/settingsSlice'
import StateStorage from '../../Infrastructure/Storage/StateStorage'
import ScreenDict from './Screen/ScreenDict'


export default function App() {
    const screenName = useSelector(selectScreenName)
    const settings = useSelector(selectSettings)

    const storage = new StateStorage(settings)
    const initialScreen = !storage.getSchemeAndHost() || !storage.getUserName() || !storage.getApiToken() 
        ? ScreenDict.WELCOME
        : ScreenDict.CHECK_TOKEN

    const screen = createScreen(screenName ? screenName : initialScreen)

    return (
        <div>
            {screen}
        </div>
    )
}
