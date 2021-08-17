import 'path'
import WelcomeScreen from "./Screen/Welcome/WelcomeScreen";
import SCREEN_DICT from "./Screen";
import AccessTokenScreen from "./Screen/AccessToken/AccessTokenScreen";
import CheckTokenScreen from "./Screen/CheckToken/CheckTokenScreen";
import IssuesScreen from "./Screen/Issues/IssuesScreen";
import Storage from "../Infrastructure/Storage/Storage";

const storage = new Storage();

class ScreenManager {
    constructor(rootId) {
        this.rootId = rootId
    }

    showScreen = screenName => {
        const screen = this._createScreen(screenName)

        screen.show(document.getElementById(this.rootId))
    }

    getInitialScreenName = () => {
        const apiToken = storage.getApiToken()
        let screenName

        if (apiToken) {
             screenName = SCREEN_DICT.CHECK_TOKEN
        } else {
            screenName = SCREEN_DICT.WELCOME
        }

        return screenName
    }

    /**
     * @param screenName
     * @return {AbstractScreen}
     * @private
     */
    _createScreen = screenName => {
        let screen
        if (screenName === SCREEN_DICT.WELCOME) {
            screen = new WelcomeScreen(screenName, this)
        } else if (screenName === SCREEN_DICT.ACCESS_TOKEN) {
            screen = new AccessTokenScreen(screenName, this)
        } else if (screenName === SCREEN_DICT.CHECK_TOKEN) {
            screen = new CheckTokenScreen(screenName, this)
        } else if (screenName === SCREEN_DICT.ISSUES) {
            screen = new IssuesScreen(screenName, this)
        }

        return screen;
    }
}

export default ScreenManager
