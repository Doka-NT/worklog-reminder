import AbstractScreen from "../AbstractScreen";
import html from './template.html'
import Screen from "../../Screen";
import SCREEN_DICT from "../../Screen";
import './style.css'
import ons from "onsenui";
import Event from '../../../Domain/Dictionary/Event'
import UrlDict from "../../../Domain/Dictionary/UrlDict";
import Storage from "../../../Infrastructure/Storage/Storage";
import EventEmitter from "../../../Event/EventEmitter";
import IntervalNotification from "../../IntervalNotification";
import JiraAPI from "../../../Infrastructure/JiraAPI/JiraAPI";

const BTN_OK = 'btnSaveAccessToken'
const BTN_BACK = 'btnBack'
const BTN_CREATE_TOKEN = 'btnCreateToken'

const FIELD_TOKEN = 'textFieldAccessToken'
const FIELD_SCHEME_AND_HOST = 'textFieldSchemeAndHost'
const FIELD_USERNAME = 'textFieldUsername'
const FIELD_INTERVAL = 'notificationInterval'

const storage = new Storage()
const eventEmitter = EventEmitter.getInstance()
const jiraAPI = new JiraAPI()

/**
 * @param {String} id
 * @return {HTMLElement}
 */
function getElement(id) {
    return document.getElementById(id);
}

class AccessTokenScreen extends AbstractScreen
{
    _beforeRender() {
        super._beforeRender();

        this.children.push(ons.createElement(html))
    }

    _afterRender() {
        super._afterRender();

        this.__setInitialState()
        this.__setupHandlers()
    }

    __setInitialState() {
        getElement(FIELD_SCHEME_AND_HOST).value = storage.getSchemeAndHost()
        getElement(FIELD_USERNAME).value = storage.getUserName()
        getElement(FIELD_TOKEN).value = storage.getApiToken()
        getElement(FIELD_INTERVAL).value = storage.getNotificationInterval(true)
    }

    __setupHandlers() {
        getElement(FIELD_TOKEN)
            .addEventListener('keyup', e => storage.setApiToken(e.target.value))

        getElement(FIELD_SCHEME_AND_HOST)
            .addEventListener('keyup', e => storage.setSchemeAndHost(e.target.value))

        getElement(FIELD_USERNAME)
            .addEventListener('keyup', e => storage.setUserName(e.target.value))

        getElement(FIELD_INTERVAL)
            .addEventListener('keyup', e => storage.setNotificationInterval(e.target.value, true))

        getElement(BTN_OK)
            .addEventListener('click', this.__btnOkClickHandler.bind(this))

        getElement(BTN_BACK)
            .addEventListener('click', () => {
                this.__validateForm()
                    ? this.sm.showScreen(SCREEN_DICT.ISSUES)
                    : this.sm.showScreen(SCREEN_DICT.WELCOME)
            })

        getElement(BTN_CREATE_TOKEN)
            .addEventListener('click', () => eventEmitter.send(Event.OPEN_IN_SHELL, UrlDict.URL_MANAGE_TOKEN))
    }

    __validateForm() {
        const schemeAndHost = getElement(FIELD_SCHEME_AND_HOST)?.value
        const username = getElement(FIELD_USERNAME)?.value
        const token = getElement(FIELD_TOKEN)?.value
        const interval = getElement(FIELD_INTERVAL)?.value

        return schemeAndHost && username && token && interval
    }

    __btnOkClickHandler() {
        if (!this.__validateForm()) {
            ons.notification.alert('All fields are required')
            return
        }

        jiraAPI.flushCache()
        new IntervalNotification(this.sm).restart(storage.getNotificationInterval())

        this.sm.showScreen(Screen.CHECK_TOKEN)

        ons.notification.toast('Settings saved!', {timeout: 1000})
    }
}

export default AccessTokenScreen
