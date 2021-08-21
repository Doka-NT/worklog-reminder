import { Button, List, ListItem } from 'react-onsenui'
import Issue from '../../../../../../Domain/Issue/Issue'

export default function IssueList(props) {
    const { issues } = props

    /**
     * @param {Issue} issue 
     */
    const createListItem = issue => {
        return (
            <ListItem key={issue.key}>
                <div className="content">
                    <img src={issue.typeIcon} />
                    <Button
                        modifier="quiet"
                        data-role="issue-link"
                        className="issue-link"
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