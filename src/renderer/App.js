
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import './App.less'

import { WelcomeScreen } from './Screen/WelcomeScreen/WelcomeScreen'
import CheckTokenScreen from './Screen/CheckTokenScreen/CheckTokenScreen'

export default function App() {
    return (
        <div>
            <CheckTokenScreen/>
            <WelcomeScreen/>
        </div>
    )
}
