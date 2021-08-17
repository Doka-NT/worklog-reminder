import CheckTokenScreen from "./CheckTokenScreen/CheckTokenScreen";
import ScreenDict from "./ScreenDict";
import { WelcomeScreen } from "./WelcomeScreen/WelcomeScreen";

export default function createScreen (screenName) {
    let screen

    switch(screenName) {
        case ScreenDict.WELCOME:
            screen = <WelcomeScreen/>
            break
        case ScreenDict.CHECK_TOKEN:
            screen = <CheckTokenScreen/>
            break;
        default:
            screen = <WelcomeScreen/>
    }

    return screen
}