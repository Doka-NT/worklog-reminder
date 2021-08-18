import { ListHeader, ListItem } from "react-onsenui"
import 'onsenui'
import TextInput from "./TextInput"
import { useSelector } from "react-redux"
import { selectNotificationInterval, selectUpdateInterval } from "../../../Store/settingsSlice"
import AbstractStorage from "../../../../../Infrastructure/Storage/AbstractStorage"

export default function OtherSettings() {

    let notificationInterval = useSelector(selectNotificationInterval)
    let updateInterval = useSelector(selectUpdateInterval)

    notificationInterval = notificationInterval ? notificationInterval : AbstractStorage.DEFAULT_NOTIFICATION_INTERVAL
    updateInterval = updateInterval ? updateInterval : AbstractStorage.DEFAULT_UPDATE_INTERVAL

    return (
        <>
            <ListHeader>Other settings</ListHeader>
            <ListItem>
                <div className="center">Notification interval, minutes:</div>
                <div className="right">
                    <TextInput placeholder="Minutes between notifications" value={notificationInterval}/>
                </div>
            </ListItem>
            <ListItem>
                <div className="center">Issue update interval, minutes:</div>
                <div className="right">
                    <TextInput placeholder="Minutes between updates" value={updateInterval}/>
                </div>
            </ListItem>
        </>
    )
}