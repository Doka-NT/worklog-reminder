import { useEffect } from "react"
import { Page, ProgressBar, PullHook } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../components/Spinner"
import CommentDialog from "./components/CommentDialog/CommentDialog"
import IssueList from "./components/IssueList/IssueList"
import IssuesToolbar from "./components/IssuesToolbar"
import SearchBar from "./components/SearchBar/SearchBar"
import TimeDialog from "./components/TimeDialog/TimeDialog"
import { loadIssuesAsync, selectIsProgressBarVisible, selectIssues, selectLastForceReloaded, selectSearchQuery } from "./slice"
import hash from 'object-hash'
import './style.less'


export default function IssuesScreen() {
    const dispatch = useDispatch()

    const issueList = useSelector(selectIssues)
    const searchQuery = useSelector(selectSearchQuery)
    const isProgressBarVisible = useSelector(selectIsProgressBarVisible)
    const lastForceReloaded = useSelector(selectLastForceReloaded)

    const issueComponent = issueList.length > 0 || searchQuery !== ''
     ? <IssueList issues={issueList}/>
     : <Spinner/>

    useEffect(() => {
        console.warn('LOAD ISSUES SEARCH')
        dispatch(loadIssuesAsync(searchQuery))
    }, [searchQuery, lastForceReloaded])

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
                        style={{ display: isProgressBarVisible ? 'block' : 'none' }}
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