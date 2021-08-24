import { useEffect } from "react"
import { Page, ProgressBar, PullHook } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import ProgressLine from "../../Components/ProgressLine"
import Spinner from "../../Components/Spinner"
import CommentDialog from "./Components/CommentDialog/CommentDialog"
import IssueList from "./Components/IssueList/IssueList"
import IssuesToolbar from "./Components/IssuesToolbar"
import SearchBar from "./Components/SearchBar/SearchBar"
import TimeDialog from "./Components/TimeDialog/TimeDialog"
import { loadIssuesAsync, selectIsProgressBarVisible, selectIssues, selectLastForceReloaded, selectSearchQuery } from "./slice"
import EventDict from "../../../../Domain/Dictionary/EventDict"
import './style.less'

const { ipcRenderer } = window.require('electron')

export default function IssuesScreen() {
    const dispatch = useDispatch()

    const issueList = useSelector(selectIssues)
    const searchQuery = useSelector(selectSearchQuery)
    const isProgressBarVisible = useSelector(selectIsProgressBarVisible)
    const lastForceReloaded = useSelector(selectLastForceReloaded)

    const issueComponent = issueList.length > 0 || searchQuery !== ''
        ? <IssueList issues={issueList} />
        : <Spinner />

    const intervalUpdateListener = () => {
        const isScreenVisible = document.querySelectorAll('.screen-issues').length > 0
        const isWindowVisible = ipcRenderer.sendSync(EventDict.SYNC_IS_WINDOW_VISIBLE)

        if (!isScreenVisible || isWindowVisible) {
            return
        }

        dispatch(loadIssuesAsync(searchQuery))
    }

    useEffect(() => {
        document.addEventListener(EventDict.RELOAD_ISSUES, intervalUpdateListener)
        dispatch(loadIssuesAsync(searchQuery))

        return () => {
            document.removeEventListener(EventDict.RELOAD_ISSUES, intervalUpdateListener)
        }
    }, [searchQuery, lastForceReloaded])

    return (
        <section className="screen screen-issues">
            <Page
                className="issue-page"
                renderToolbar={() => <IssuesToolbar />}
            >
                <PullHook></PullHook>

                <SearchBar />

                <ProgressLine isVisible={isProgressBarVisible} />

                <div id="issues-list" className="center">
                    {issueComponent}
                </div>

                <TimeDialog />
                <CommentDialog />
            </Page>
        </section>
    )
}