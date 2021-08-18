import { Page, PullHook, SearchInput, ProgressBar } from "react-onsenui"
import IssueList from "./components/IssueList/IssueList"
import IssuesToolbar from "./components/IssuesToolbar"
import TimeDialog from "./components/TimeDialog/TimeDialog"
import './style.less'


export default function IssuesScreen() {
    return (
        <section className="screen screen-issues">
            <Page
                className="issue-page"
                renderToolbar={() => <IssuesToolbar />}
            >
                <PullHook></PullHook>

                <SearchInput
                    type="search"
                    style={{ width: '100%' }}
                    placeholder="Search"
                />

                <div className="progress-wrapper">
                    <ProgressBar
                        id="searchProgress"
                        style={{ display: 'none' }}
                        indeterminate={true}
                    />
                </div>

                <IssueList />

                <TimeDialog />


            </Page>
        </section>
    )
}