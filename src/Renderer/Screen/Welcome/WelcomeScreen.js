import html from './template.html'
import AbstractScreen from "../AbstractScreen";
import Event from '../../../Domain/Dictionary/Event'
import UrlDict from "../../../Domain/Dictionary/UrlDict";
import EventEmitter from "../../../Event/EventEmitter";
import Storage from "../../../Infrastructure/Storage/Storage";
import JiraAPI from "../../../Infrastructure/JiraAPI/JiraAPI";
import SCREEN_DICT from "../../Screen";
import ons from 'onsenui'

const CAROUSEL = 'carousel'
const CAROUSEL_NAV_BUTTON_SELECTOR = '[data-role="nav-button"]'

const PROGRESS_BAR = 'progressBar'

const FIELD_SCHEME_AND_HOST = 'fieldSchemeAndHost'
const FIELD_USERNAME = 'fieldUsername'
const FIELD_TOKEN = 'fieldToken'

const BTN_CREATE_TOKEN = 'btnCreateToken'
const BTN_FINISH = 'btnFinish'

const eventEmitter = EventEmitter.getInstance()
const storage = new Storage()
const jiraAPI = new JiraAPI()

class WelcomeScreen extends AbstractScreen {

    _beforeRender() {
        super._beforeRender();

        this.html = html
    }

    _afterRender() {
        super._afterRender();

        this.__setupCarouselHandlers()
        this.__setupProgressBar()
        this.__setupInputHandlers()

        document.getElementById(BTN_CREATE_TOKEN)
            .addEventListener('click', () => {
                eventEmitter.send(Event.OPEN_IN_SHELL, UrlDict.URL_MANAGE_TOKEN)
            })

        document.getElementById(BTN_FINISH)
            .addEventListener('click', this.__handleBtnFinish.bind(this))
    }

    _getCarousel() {
        return document.getElementById(CAROUSEL)
    }

    __setupCarouselHandlers()
    {
        document.querySelectorAll(CAROUSEL_NAV_BUTTON_SELECTOR).forEach(el => {
            el.addEventListener('click', this.__handleCarouseNav.bind(this))
        })
    }

    __handleCarouseNav(e)
    {
        const el = e.target
        if (el.getAttribute('data-direction') === 'next') {
            this._getCarousel().next()
        } else if (el.getAttribute('data-direction') === 'prev') {
            this._getCarousel().prev()
        } else {
            throw new Error('Unexpected data-direction')
        }
    }

    __setupProgressBar()
    {
        const carousel = document.getElementById(CAROUSEL)
        const bar = document.getElementById(PROGRESS_BAR)

        const itemWidth = 100 / carousel.itemCount;

        bar.value = 0

        carousel.addEventListener('postchange', e => {
            bar.value = itemWidth * (e.activeIndex)
        })
    }

    __setupInputHandlers()
    {
        document.getElementById(FIELD_SCHEME_AND_HOST)
            .addEventListener('change', e => storage.setSchemeAndHost(e.target.value))
        document.getElementById(FIELD_USERNAME)
            .addEventListener('change', e => storage.setUserName(e.target.value))
        document.getElementById(FIELD_TOKEN)
            .addEventListener('change', e => storage.setApiToken(e.target.value))
    }

    __handleBtnFinish()
    {
        ons.notification.toast('💡 Trying to connect to JIRA....', {timeout: 1000})

        jiraAPI.flushCache()
        jiraAPI.searchIssues()
            .then(issues => {
                if (issues.length === 0) {
                    ons.notification.toast('⚠️ Jira return 0 issues. Check your Jira URL and username', {
                        force: true,
                        timeout: 2000,
                    })
                    return
                }

                ons.notification.toast('✅ All done! Your are awesome!', {timeout: 2000})
                this.sm.showScreen(SCREEN_DICT.ISSUES)

                const notification = new Notification("Worklog Reminder", {body: "Setup is finished! I hope this app will be useful for you!" });

                notification.addEventListener('click', () => {
                    EventEmitter.getInstance().send(Event.SHOW_MAIN_WINDOW)
                });
            })
            .catch(() => {
                ons.notification.toast('🚫 <b>Error!</b><p>Check credentials and Jira URL</p>In some cases it could be permission issue', {
                    force: true,
                    timeout: 5000,
                })
            })
    }
}

export default WelcomeScreen
