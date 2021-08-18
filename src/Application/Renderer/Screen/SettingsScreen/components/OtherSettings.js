import 'onsenui'
import { ListHeader, ListItem } from "react-onsenui"
import { useSelector } from "react-redux"
import TextInput from "./TextInput"
import { selectSettings } from '../../../Store/settingsSlice'
import StateStorage from '../../../../../Infrastructure/Storage/StateStorage'

export default function OtherSettings() {

    const state = useSelector(selectSettings)
    const storage = new StateStorage(state)

    return (
        <>
            <ListHeader>Other settings</ListHeader>
            <ListItem>
                <div className="center">Notification interval, minutes:</div>
                <div className="right">
                    <TextInput
                        placeholder="Minutes between notifications"
                        value={storage.getNotificationInterval(true)} />
                </div>
            </ListItem>
            <ListItem>
                <div className="center">Issue update interval, minutes:</div>
                <div className="right">
                    <TextInput
                        placeholder="Minutes between updates"
                        value={storage.getUpdateInterval(true)} />
                </div>
            </ListItem>
        </>
    )
}