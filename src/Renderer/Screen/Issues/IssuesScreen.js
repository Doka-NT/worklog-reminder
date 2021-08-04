import AbstractScreen from "../AbstractScreen";
import html from './template.html'
import ons from "onsenui";
import SCREEN_DICT from "../../Screen";
import JiraAPI from "../../../Infrastructure/JiraAPI/JiraAPI";
import Worklog from "../../../Domain/Worklog/Worklog";
import './style.css'

const DIALOG_TIME = 'time-dialog'
const DIALOG_COMMENT = 'comment-dialog'

const BTN_ADD_COMMENT = 'btnAddComment'
const FIELD_COMMENT = 'fieldComment'

const TEXT_BTN_ADD_COMMENT = 'Add comment'
const TEXT_BTN_WITHOUT_COMMENT = 'Ok'

const jiraAPI = new JiraAPI()

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

        const issueListRoot = document.getElementById('issues-list')
        this.__loadIssues().then(issueListEl => {
            issueListRoot.innerHTML = ''
            issueListRoot.appendChild(issueListEl)

            this.__setupListHandler()
        })

        document.getElementById('btnSettings')
            .addEventListener('click', () => this.sm.showScreen(SCREEN_DICT.ACCESS_TOKEN))

        this.__setupTimeButtonsHandler()
        this.__setupCommentDialogHandlers()
    }

     __loadIssues() {
        return jiraAPI.searchIssues().then(issues => {
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
        <ons-button modifier="quiet">${issue.key}</ons-button>
        ${issue.summary}
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

        fieldComment.addEventListener('keyup', e => {
            btnAddCommentEl.innerText = e.target.value === '' ? TEXT_BTN_WITHOUT_COMMENT : TEXT_BTN_ADD_COMMENT
        })

        btnAddCommentEl.addEventListener('click', () => {
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
        })
    }
}

export default IssuesScreen
