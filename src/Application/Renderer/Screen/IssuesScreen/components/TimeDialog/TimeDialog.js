import { Button, Card, Dialog } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import ProgressLine from "../../../../Components/ProgressLine"
import { addIssueWorklogAsync, selectCurrentIssue, selectIsTimeProgressVisible, setCurrentIssue } from "../../slice"

const timeMap = {
    5: '5m',
    10: '10m',
    15: '15m',
    30: '30m',
    60: '1h',
    90: '1h 30m',
    120: '2h',
    150: '2h 30m',
    180: '3h',
    210: '3h 30m',
    240: '4h',
    300: '5h',
    360: '6h',
    420: '7h',
    480: '8h',
}

export default function TimeDialog() {
    const dispatch = useDispatch()
    const issue = useSelector(selectCurrentIssue)
    const isProgressBarVisible = useSelector(selectIsTimeProgressVisible)

    const onCancel = () => dispatch(setCurrentIssue(null))

    const onClick = minutes => {
        dispatch(addIssueWorklogAsync(minutes))
    }

    const buttons = Object.entries(timeMap)
        .map(entry => <Button
            key={entry[0]}
            modifier="outline"
            className="time-button"
            onClick={() => onClick(entry[0])}
        >{entry[1]}</Button>)

    return (
        <Dialog
            isOpen={issue !== null}
            onCancel={onCancel}
            isCancelable={true}
        >
            <Card>
                <ProgressLine isVisible={isProgressBarVisible}/>    
                
                <div className="title">
                    How much time you spent?
                </div>
                <div className="content">
                    <div style={{ textAlign: 'justify' }}>
                        {buttons}
                    </div>
                </div>
            </Card>
        </Dialog>
    )
}