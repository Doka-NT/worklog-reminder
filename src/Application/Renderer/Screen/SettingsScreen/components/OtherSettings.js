import 'onsenui'
import { ListHeader, ListItem } from "react-onsenui"
import { useSelector } from "react-redux"
import { getMilliseconds } from '../../../../../Infrastructure/Storage/AbstractStorage'
import StateStorage from '../../../../../Infrastructure/Storage/StateStorage'
import { selectSettings, setNotificationInterval, setUpdateInterval } from '../../../Store/settingsSlice'
import TextInput from "./TextInput"
import { useDispatch } from 'react-redux'

export default function OtherSettings() {
    const dispatch = useDispatch()

    const state = useSelector(selectSettings)
    const storage = new StateStorage(state)

    const onNotificationIntervalChange = e => {
        dispatch(setNotificationInterval(getMilliseconds(e.value)))
    }

    const onUpdateIntervalChange = e => {
        dispatch(setUpdateInterval(getMilliseconds(e.value)))
    }

    return (
        <>
            <ListHeader>Other settings</ListHeader>
            <ListItem>
                <div className="center">Notification interval, minutes:</div>
                <div className="right">
                    <TextInput
                        placeholder="Minutes between notifications"
                        value={storage.getNotificationInterval(true)}
                        onChange={onNotificationIntervalChange}
                    />
                </div>
            </ListItem>
            <ListItem>
                <div className="center">Issue update interval, minutes:</div>
                <div className="right">
                    <TextInput
                        placeholder="Minutes between updates"
                        value={storage.getUpdateInterval(true)}
                        onChange={onUpdateIntervalChange}
                    />
                </div>
            </ListItem>
        </>
    )
}