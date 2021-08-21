import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import StateStorage from '../../../../../../Infrastructure/Storage/StateStorage'
import JiraAPI from '../../../../../../Infrastructure/JiraAPI/JiraAPI'
import Spinner from '../../../../components/Spinner'
import { List, ListItem, Button } from 'react-onsenui'
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