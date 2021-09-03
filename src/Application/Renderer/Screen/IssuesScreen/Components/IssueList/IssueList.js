import { Button, List, ListItem } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import EventDict from '../../../../../../Domain/Dictionary/EventDict';
import EventEmitter from '../../../../../../Domain/EventEmitter';
import Issue from '../../../../../../Domain/Issue/Issue';
import { selectListItemIndex, setCurrentIssue, setListItemIndex } from '../../slice';

export default function IssueList(props) {
  const { issues } = props;

  const dispatch = useDispatch();
  const index = useSelector(selectListItemIndex);

  /**
   * @param {Issue} issue
   */
  const onLinkClick = (issue, event) => {
    EventEmitter.getInstance().send(EventDict.OPEN_IN_SHELL, issue.url);
    event.stopPropagation();
  };

  /**
   * @param {Issue} issue
   */
  const onClick = (issue) => {
    dispatch(setCurrentIssue(issue));
    dispatch(setListItemIndex(issues.indexOf(issue)));
  };

  const getItemClassName = (i) => {
    const className = 'issue-list-item ';

    return className + (i === index ? 'focused' : '');
  };

  /**
   * @param {Issue} issue
   */
  const createListItem = (issue, i) => (
    <ListItem
      key={issue.key}
      onClick={() => onClick(issue)}
      className={getItemClassName(i)}
    >
      <div className="content">
        <img src={issue.typeIcon} />
        <Button
          modifier="quiet"
          className="issue-link"
          onClick={(event) => onLinkClick(issue, event)}
        >
          {issue.key}
        </Button>
        <span className="issue-summary">{issue.summary}</span>
      </div>
    </ListItem>
  );

  const listItems = issues.map(createListItem);

  return (
    <List>
      {listItems}
    </List>
  );
}
