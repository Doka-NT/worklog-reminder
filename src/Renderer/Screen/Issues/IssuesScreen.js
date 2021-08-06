import AbstractScreen from "../AbstractScreen";
import html from './template.html'
import ons from "onsenui";
import SCREEN_DICT from "../../Screen";
import JiraAPI from "../../../Infrastructure/JiraAPI/JiraAPI";
import Worklog from "../../../Domain/Worklog/Worklog";
import './style.css'
import EventEmitter from "../../../Event/EventEmitter";
import Event from "../../../Domain/Dictionary/Event";

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
    }

    _loadAndRenderIssues(searchText = '') {
        const issueListRoot = document.getElementById('issues-list')

        return this.__loadIssues(searchText).then(issueListEl => {
            issueListRoot.innerHTML = ''
            issueListRoot.appendChild(issueListEl)

            this.__setupListHandler()
        })
    }

    __loadIssues(searchText) {
        return jiraAPI.searchIssues(searchText).then(issues => {
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

    __setupListHandler() {
        const modal = document.querySelector(`#${DIALOG_TIME}`)

        document.querySelectorAll('ons-list-item [data-role="issue-link"]').forEach(el => {
            el.addEventListener('click', e => {
                eventEmitter.send(Event.OPEN_IN_SHELL, jiraAPI.getIssueUrl(e.target.innerText))
                e.stopPropagation()
            })
        })

        document.querySelectorAll('ons-list-item').forEach(el => {
            el.addEventListener('click', e => {
                const issueKey = e.target.getAttribute('data-issue-key')

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
        const isCommentProvided = fieldComment.value !== ''

        if (!isCommentProvided) {
            dialogComment.hide()
            return
        }

        jiraAPI.updateWorklog(IssuesScreen.lastWorklogEntity, fieldComment.value).then(() => {
            dialogComment.hide()
            ons.notification.toast('Worklog comment has been saved', {
                timeout: 2000
            })
        })
    }

    __setupPullHook()
    {
        const pullHook = document.getElementById('pull-hook');

        pullHook.addEventListener('changestate', function(event) {
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
                    break;
            }

            pullHook.innerHTML = message;
        });

        pullHook.onAction = done => {
            jiraAPI.flushCache()
            this._loadAndRenderIssues().then(done)
        };
    }

    __setupSearchHandler()
    {
        const progress = document.getElementById(SEARCH_PROGRESS)

        document.getElementById(FIELD_SEARCH)
            .addEventListener('change', e => {
                progress.style.opacity = "1"

                this._loadAndRenderIssues(e.target.value)
                    .then(() => {
                        progress.style.opacity = "0"
                    })
            })
    }
}

export default IssuesScreen
