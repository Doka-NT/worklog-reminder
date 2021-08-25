import 'onsenui'
import { Button, ListHeader, ListItem } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import StateStorage from "../../../../../Infrastructure/Storage/StateStorage"
import { selectSettings, setHost, setToken, setUsername } from "../../../Store/settingsSlice"
import WideTextInput from "./WideTextInput"
import EventEmitter from '../../../../../Domain/EventEmitter'
import EventDict from '../../../../../Domain/Dictionary/EventDict'
import UrlDict from '../../../../../Domain/Dictionary/UrlDict'

export default function CredentialsSettings() {
  const dispatch = useDispatch()

  const state = useSelector(selectSettings)
  const storage = new StateStorage(state)

  const onCreateTokenClick = () => {
    EventEmitter.getInstance().send(EventDict.OPEN_IN_SHELL, UrlDict.URL_MANAGE_TOKEN)
  }

  const onHostChange = e => dispatch(setHost(e.value))
  const onUserChange = e => dispatch(setUsername(e.value))
  const onTokenChange = e => dispatch(setToken(e.value))

  return (
    <>
      <ListHeader>Provide your JIRA credentials</ListHeader>
      <ListItem>
        <div className="left">URL</div>
        <div className="center">
          <WideTextInput
            placeholder="https://example.atlassian.net"
            value={storage.getSchemeAndHost()}
            onChange={onHostChange}
          />
        </div>
      </ListItem>
      <ListItem>
        <div className="left">User</div>
        <div className="center">
          <WideTextInput
            placeholder="foobar@example.com"
            value={storage.getUserName()}
            onChange={onUserChange}
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
            onChange={onTokenChange}
          />
        </div>
      </ListItem>
      <ListItem>
        <div className="left" style={{ width: 'auto' }}></div>
        <div className="center">
          <Button modifier="quiet" class="btn-link" onClick={onCreateTokenClick}>Click here to create token</Button>
        </div>
      </ListItem>
    </>
  )
}