import 'onsenui'
import { Button, ListHeader, ListItem } from "react-onsenui"
import { useSelector } from "react-redux"
import StateStorage from "../../../../../Infrastructure/Storage/StateStorage"
import { selectSettings } from "../../../Store/settingsSlice"
import WideTextInput from "./WideTextInput"

export default function CredentialsSettings() {

    const state = useSelector(selectSettings)
    const storage = new StateStorage(state)

    return (
        <>
            <ListHeader>Provide your JIRA credentials</ListHeader>
            <ListItem>
                <div className="left">URL</div>
                <div className="center">
                    <WideTextInput
                        placeholder="https://example.atlassian.net"
                        value={storage.getSchemeAndHost()}
                    />
                </div>
            </ListItem>
            <ListItem>
                <div className="left">User</div>
                <div className="center">
                    <WideTextInput
                        placeholder="foobar@example.com"
                        value={storage.getUserName()}
                    />
                </div>
            </ListItem>
            <ListItem>
                <div className="left">Token</div>
                <div className="center">
                    <WideTextInput
                        type="password"
                        placeholder="Paste your API Token here"
                        value={storage.getApiToken()}
                    />
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