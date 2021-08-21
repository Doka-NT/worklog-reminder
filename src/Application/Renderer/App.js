
import 'onsenui/css/onsen-css-components.css'
import 'onsenui/css/onsenui.css'
import { useSelector } from 'react-redux'
import './App.less'
import { selectScreenName } from './appSlice'
import createScreen from './Screen/factory'


export default function App() {
    const screenName = useSelector(selectScreenName)

    const screen = createScreen(screenName)

    return (
        <div>
            {screen}
        </div>
    )
}
