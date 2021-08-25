import { Button, Card, Dialog } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../Components/Input';
import ProgressLine from '../../../../Components/ProgressLine';
import {
  saveWorklogCommentAsync,
  selectCurrentWorklog,
  selectIsCommentProgressVisible,
  selectWorklogComment,
  setCurrentWorklog,
  setWorklogComment,
} from '../../slice';
import './style.less';

export default function CommentDialog() {
  const dispatch = useDispatch();

  const currentWorklog = useSelector(selectCurrentWorklog);
  const isProgressBarVisible = useSelector(selectIsCommentProgressVisible);
  const worklogComment = useSelector(selectWorklogComment);
  const isOpen = currentWorklog !== null;

  const buttonText = worklogComment.length > 0 ? 'Add comment' : 'Ok';

  const onChange = (value) => {
    dispatch(setWorklogComment(value));
  };

  const onClose = () => {
    dispatch(setCurrentWorklog(null));
    dispatch(setWorklogComment(''));
  };

  const onSave = (comment) => {
    if (comment.length > 0) {
      dispatch(saveWorklogCommentAsync(comment));
    }

    onClose();
  };

  const onEnter = (e) => {
    onChange(e.target.value);
    onSave(e.target.value);
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      isCancelable
      onCancel={onCancel}
    >
      <Card>
        <ProgressLine isVisible={isProgressBarVisible} />

        <div className="title">
          What did you do?
        </div>
        <div className="content">
          <Input
            isFocused={isOpen}
            class="comment-input"
            placeholder="Type some comment here"
            modifier="underbar"
            value={worklogComment}
            onChange={(e) => onChange(e.value)}
            onEnter={onEnter}
            onKeyUp={(e) => onChange(e.target.value)}
          />
          <p />
          <Button modifier="large" onClick={() => onSave(worklogComment)}>{buttonText}</Button>
        </div>
      </Card>
    </Dialog>
  );
}
