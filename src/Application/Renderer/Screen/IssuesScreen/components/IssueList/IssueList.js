import { Button, List, ListItem } from 'react-onsenui'
import { useDispatch } from 'react-redux'
import EventDict from '../../../../../../Domain/Dictionary/EventDict'
import EventEmitter from '../../../../../../Domain/EventEmitter'
import Issue from '../../../../../../Domain/Issue/Issue'
import { setCurrentIssue } from '../../slice'

export default function IssueList(props) {
    const { issues } = props

    const dispatch = useDispatch()

    /**
     * @param {Issue} issue 
     */
    const onLinkClick = (issue, event) => {
        EventEmitter.getInstance().send(EventDict.OPEN_IN_SHELL, issue.url)
        event.stopPropagation()
    }

    /**
     * @param {Issue} issue 
     */
    const onClick = issue => {
        dispatch(setCurrentIssue(issue))
    }

    /**
     * @param {Issue} issue 
     */
    const createListItem = issue => {
        return (
            <ListItem
                key={issue.key}
                onClick={() => onClick(issue)}
            >
                <div className="content">
                    <img src={issue.typeIcon} />
                    <Button
                        modifier="quiet"
                        className="issue-link"
                        onClick={(event) => onLinkClick(issue, event)}
                    >{issue.key}</Button>
                    <span className="issue-summary">{issue.summary}</span>
                </div>
            </ListItem>
        )
    }

    const listItems = issues.map(createListItem)

    return (
        <List>
            {listItems}
        </List>
    )
}