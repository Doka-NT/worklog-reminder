import { Button, Card, Dialog } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../../../Components/Input"
import ProgressLine from "../../../../Components/ProgressLine"
import {
    saveWorklogCommentAsync,
    selectCurrentWorklog,
    selectIsCommentProgressVisible,
    selectWorklogComment,
    setCurrentWorklog,
    setWorklogComment
} from "../../slice"
import './style.less'

export default function CommentDialog() {
    const dispatch = useDispatch()

    const currentWorklog = useSelector(selectCurrentWorklog)
    const isProgressBarVisible = useSelector(selectIsCommentProgressVisible)
    const worklogComment = useSelector(selectWorklogComment)

    const onChange = value => {
        dispatch(setWorklogComment(value))
    }

    const onEnter = e => {
        console.log('ON enter', e)
        onChange(e.target.value)
        onSave(e.target.value)
    }

    const onClose = () => {
        dispatch(setCurrentWorklog(null))
        dispatch(setWorklogComment(''))
    }

    const onSave = comment => {
        dispatch(saveWorklogCommentAsync(comment))
        onClose()
    }

    const onCancel = () => {
        onClose()
    }

    return (
        <Dialog
            isOpen={currentWorklog !== null}
            isCancelable={true}
            onCancel={onCancel}
        >
            <Card>
                <ProgressLine isVisible={isProgressBarVisible} />

                <div className="title">
                    What did you do?
                </div>
                <div className="content">
                    <Input
                        isFocused={true}
                        className="comment-input"
                        placeholder="Type some comment here"
                        modifier="underbar"
                        value={worklogComment}
                        onChange={e => onChange(e.value)}
                        onEnter={onEnter}
                    />
                    <p></p>
                    <Button modifier="large" onClick={() => onSave(worklogComment)}>Ok</Button>
                </div>
            </Card>
        </Dialog>
    )
}