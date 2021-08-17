
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import './App.less'

import { WelcomeScreen } from './Screen/WelcomeScreen/WelcomeScreen'
import CheckTokenScreen from './Screen/CheckTokenScreen/CheckTokenScreen'
import { useSelector } from 'react-redux'
import createScreen from './Screen/factory'
import { selectScreenName } from './appSlice'

export default function App() {
    const screenName = useSelector(selectScreenName)

    const screen = createScreen(screenName)

    return (
        <div>
            {screen}
        </div>
    )
}
