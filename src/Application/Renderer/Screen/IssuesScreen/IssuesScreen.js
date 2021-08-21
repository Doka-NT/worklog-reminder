import { useEffect, useRef } from "react"
import { Page, PullHook, SearchInput, ProgressBar } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import JiraAPI from "../../../../Infrastructure/JiraAPI/JiraAPI"
import StateStorage from "../../../../Infrastructure/Storage/StateStorage"
import { selectSettings } from "../../Store/settingsSlice"
import CommentDialog from "./components/CommentDialog/CommentDialog"
import IssueList from "./components/IssueList/IssueList"
import IssuesToolbar from "./components/IssuesToolbar"
import TimeDialog from "./components/TimeDialog/TimeDialog"
import Spinner from "../../components/Spinner"
import { selectIssues, selectSearchQuery, setIssues } from "./slice"
import hash from 'object-hash'
import './style.less'
import useAutofocus from "../../Hooks/useAutofocus"
import SearchBar from "./components/SearchBar/SearchBar"


export default function IssuesScreen() {
    const dispatch = useDispatch()

    const settings = useSelector(selectSettings)
    const issueList = useSelector(selectIssues)
    const searchQuery = useSelector(selectSearchQuery)

    const issueComponent = issueList.length > 0
     ? <IssueList issues={issueList}/>
     : <Spinner/>
    const issueListHash = hash(JSON.stringify(issueList))

    const loadIssues = () => {
        const storage = new StateStorage(settings)
        const jiraApi = new JiraAPI(storage)

        console.warn('LOAD ISSUES')
        jiraApi.searchIssues(searchQuery).then(issues => dispatch(setIssues(issues)))
    }

    useEffect(loadIssues, [issueListHash, searchQuery])

    return (
        <section className="screen screen-issues">
            <Page
                className="issue-page"
                renderToolbar={() => <IssuesToolbar />}
            >
                <PullHook></PullHook>

                <SearchBar/>

                <div className="progress-wrapper">
                    <ProgressBar
                        id="searchProgress"
                        style={{ display: 'none' }}
                        indeterminate={true}
                    />
                </div>

                <div id="issues-list" className="center">
                    {issueComponent}
                </div>

                <TimeDialog />
                <CommentDialog />
            </Page>
        </section>
    )
}