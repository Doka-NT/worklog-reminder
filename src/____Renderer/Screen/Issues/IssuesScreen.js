import AbstractScreen from "../AbstractScreen";
import html from './template.html'
import ons from "onsenui";
import SCREEN_DICT from "../../Screen";
import JiraAPI from "../../../Infrastructure/JiraAPI/JiraAPI";
import Worklog from "../../../Domain/Worklog/Worklog";
import './style.css'
import EventEmitter from "../../../Event/EventEmitter";
import EventDict from "../../../Domain/Dictionary/EventDict";

const BTN_RELOAD = 'btnReload'

const DIALOG_TIME = 'time-dialog'
const DIALOG_COMMENT = 'comment-dialog'

const BTN_ADD_COMMENT = 'btnAddComment'
const FIELD_COMMENT = 'fieldComment'

const FIELD_SEARCH = 'fieldSearch'
const SEARCH_PROGRESS = 'searchProgress'

const TEXT_BTN_ADD_COMMENT = 'Add comment'
const TEXT_BTN_WITHOUT_COMMENT = 'Ok'

const jiraAPI = new JiraAPI()
const eventEmitter = new EventEmitter()

class IssuesScreen extends AbstractScreen {
    static issues = []
    static selectedIssue = null
    static lastWorklogId = ''
    static lastWorklogEntity = null
    static intervalUpdateHandlers = []

    _beforeRender() {
        super._beforeRender();
        this.children.push(ons.createElement(html))
    }

    _afterRender() {
        super._afterRender();

        this._loadAndRenderIssues();

        document.getElementById('btnSettings')
            .addEventListener('click', () => this.sm.showScreen(SCREEN_DICT.ACCESS_TOKEN))

        this.__setupPullHook()
        this.__setupTimeButtonsHandler()
        this.__setupCommentDialogHandlers()
        this.__setupSearchHandler()
        this.__setupReloadHandler()
        this.__setupIntervalUpdate()
    }

    _loadAndRenderIssues(searchText = '', forceReload = false) {
        const issueListRoot = document.getElementById('issues-list')

        this.__showProgressBar()

        return this.__loadIssues(searchText, forceReload).then(issueListEl => {
            issueListRoot.innerHTML = ''
            issueListRoot.appendChild(issueListEl)

            this.__setupListHandler()
            this.__hideProgressBar()

            // todo: find out how to focus search input by event
            setTimeout(() => document.getElementById(FIELD_SEARCH).focus(), 100)
        })
    }

    __loadIssues(searchText, forceReload) {
        if (forceReload) {
            jiraAPI.flushCache()
        }

        return jiraAPI.searchByKeyOrText(searchText).then(issues => {
            IssuesScreen.issues = issues

            const listItems = issues.map(issue => this.__createListItem(issue))

            return this.__createList(listItems)
        })
            .catch(err => {
                console.error(err)
            });
    }

    /**
     * @param {Issue} issue
     * @return {HTMLElement | Promise<HTMLElement>}
     * @private
     */
    __createListItem(issue) {
        return ons.createElement(`
<ons-list-item data-issue-key="${issue.key}">
    <div class="content">
        <img src="${issue.typeIcon}"/>
        <ons-button modifier="quiet" data-role="issue-link" class="issue-link">${issue.key}</ons-button>
        <span class="issue-summary">${issue.summary}</span>
    </div>
</ons-list-item>`)
    }

    /**
     * @param {Element[]} items
     * @return {HTMLElement | Promise<HTMLElement>}
     * @private
     */
    __createList(items) {
        const list = ons.createElement(`<ons-list></ons-list>`)

        items.forEach(item => list.appendChild(item))

        return list
    }

    __setupIntervalUpdate()
    {
        const { ipcRenderer } = window.require('electron')

        this.constructor.intervalUpdateHandlers
            .forEach(l => document.removeEventListener(EventDict.RELOAD_ISSUES, l))

        const listener = () => {
            const isScreenVisible = document.querySelectorAll('.screen-issues').length > 0
            const isWindowVisible = ipcRenderer.sendSync(EventDict.SYNC_IS_WINDOW_VISIBLE)

            if (!isScreenVisible || isWindowVisible) {
                return
            }

            this._loadAndRenderIssues('', true)
                .then(r => r)
        }

        this.constructor.intervalUpdateHandlers.push(listener)
        document.addEventListener(EventDict.RELOAD_ISSUES, listener)
    }

    __setupListHandler() {
        const modal = document.querySelector(`#${DIALOG_TIME}`)

        document.querySelectorAll('ons-list-item [data-role="issue-link"]').forEach(el => {
            el.addEventListener('click', e => {
                eventEmitter.send(EventDict.OPEN_IN_SHELL, jiraAPI.getIssueUrl(e.target.innerText))
                e.stopPropagation()
            })
        })

        const findListItemFromChildren = el => {
            let currentEl = el
            const maxDepth = 4
            let currDepth = 0

            while (currentEl.tagName.toLowerCase() !== 'ons-list-item' && currDepth < maxDepth) {
                currentEl = currentEl.parentElement
                currDepth++
            }

            return currentEl
        }

        document.querySelectorAll('ons-list-item').forEach(el => {
            el.addEventListener('click', e => {
                const el = findListItemFromChildren(e.target)
                const issueKey = el.getAttribute('data-issue-key')

                IssuesScreen.selectedIssue = IssuesScreen.issues.reduce((prev, next) => {
                    let result = prev;
                    if (prev && prev.key === issueKey) {
                        result = prev
                    }

                    if (next && next.key === issueKey) {
                        result = next
                    }

                    return result
                })

                modal.show()
            })
        })
    }

    __setupTimeButtonsHandler() {
        document.querySelectorAll('.time-button').forEach(el => {
            el.addEventListener('click', e => {
                const worklog = new Worklog(IssuesScreen.selectedIssue, e.target.innerText)

                worklog.save()
                    .then(() => {
                        document.querySelector(`#${DIALOG_TIME}`).hide()
                        document.querySelector(`#${DIALOG_COMMENT}`).show()
                        document.getElementById(FIELD_COMMENT).focus()

                        IssuesScreen.lastWorklogId = worklog.id
                        IssuesScreen.lastWorklogEntity = worklog

                        ons.notification.toast('Worklog added!', {timeout: 1000})
                    })
            })
        })
    }

    __setupCommentDialogHandlers() {
        const btnAddCommentEl = document.querySelector(`#${BTN_ADD_COMMENT}`)
        const fieldComment = document.querySelector(`#${FIELD_COMMENT}`);

        fieldComment.addEventListener('keypress', e => {
            if (e.keyCode !== 13) {
                return
            }

            this.__saveWorklogComment()
        })
        fieldComment.addEventListener('keyup', e => {
            btnAddCommentEl.innerText = e.target.value === '' ? TEXT_BTN_WITHOUT_COMMENT : TEXT_BTN_ADD_COMMENT
        })

        btnAddCommentEl.addEventListener('click', () => this.__saveWorklogComment())
    }

    __saveWorklogComment()
    {
        const dialogComment = document.querySelector(`#${DIALOG_COMMENT}`);
        const fieldComment = document.querySelector(`#${FIELD_COMMENT}`);

        const isCommentProvided = fieldComment.value !== ''

        if (!isCommentProvided) {
            dialogComment.hide()
            return
        }

        jiraAPI.updateWorklog(IssuesScreen.lastWorklogEntity, fieldComment.value).then(() => {
            dialogComment.hide()
            fieldComment.value = ""
            ons.notification.toast('Worklog comment has been saved', {
                timeout: 2000
            })
        })
    }

    __setupPullHook()
    {
        const pullHook = document.getElementById('pull-hook');

        pullHook.addEventListener('changestate', event => {
            let message = '';

            switch (event.state) {
                case 'initial':
                    message = 'Pull to refresh';
                    break;
                case 'preaction':
                    message = 'Release';
                    break;
                case 'action':
                    message = 'Loading...';
                    this.__showProgressBar()
                    break;
            }

            pullHook.innerHTML = message;
        });

        pullHook.onAction = done => {
            this._loadAndRenderIssues('', true)
                .then(() => this.__hideProgressBar())
                .then(done)
        };
    }

    __setupReloadHandler()
    {
        document.getElementById(BTN_RELOAD)
            .addEventListener('click', () => {
                this.__showProgressBar();
                this._loadAndRenderIssues('', true).then(() => this.__hideProgressBar())
            })
    }

    __setupSearchHandler()
    {
        document.getElementById(FIELD_SEARCH)
            .addEventListener('search', e => {
                this.__showProgressBar()

                this._loadAndRenderIssues(e.target.value, true)
                    .then(() => {
                        this.__hideProgressBar()
                    })
            })
    }

    __getProgressBar()
    {
        return document.getElementById(SEARCH_PROGRESS)
    }

    __showProgressBar()
    {
        this.__getProgressBar().style.display = "block"
    }

    __hideProgressBar()
    {
        this.__getProgressBar().style.display = "none"
    }
}

export default IssuesScreen
