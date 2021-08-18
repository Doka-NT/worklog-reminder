import { ListHeader, ListItem, Button } from "react-onsenui"
import 'onsenui'
import WideTextInput from "./WideTextInput"
import { useSelector } from "react-redux"
import { selectHost, selectToken, selectUsername } from "../../../Store/settingsSlice"

export default function CredentialsSettings() {

    const host = useSelector(selectHost)
    const username = useSelector(selectUsername)
    const token = useSelector(selectToken)

    return (
        <>
            <ListHeader>Provide your JIRA credentials</ListHeader>
            <ListItem>
                <div className="left">URL</div>
                <div className="center">
                    <WideTextInput placeholder="https://example.atlassian.net" value={host}/>
                </div>
            </ListItem>
            <ListItem>
                <div className="left">User</div>
                <div className="center">
                    <WideTextInput placeholder="foobar@example.com" value={username}/>
                </div>
            </ListItem>
            <ListItem>
                <div className="left">Token</div>
                <div className="center">
                    <WideTextInput type="password" placeholder="Paste your API Token here" value={token}/>
                </div>
            </ListItem>
            <ListItem>
                <div className="left" style={{ width: 'auto' }}></div>
                <div className="center">
                    <Button modifier="quiet" class="btn-link">Click here to create token</Button>
                </div>
            </ListItem>
        </>
    )
}