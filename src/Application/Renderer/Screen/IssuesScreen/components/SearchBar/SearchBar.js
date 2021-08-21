import { useEffect, useRef } from "react"
import 'onsenui'
import useAutofocus from "../../../../Hooks/useAutofocus"
import StateStorage from "../../../../../../Infrastructure/Storage/StateStorage"
import JiraAPI from "../../../../../../Infrastructure/JiraAPI/JiraAPI"
import { setIssues, setSearchQuery } from "../../slice"
import { useDispatch, useSelector } from "react-redux"
import { selectSettings } from "../../../../Store/settingsSlice"

export default function SearchBar() {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const settings = useSelector(selectSettings)

    const stateStorage = new StateStorage(settings)
    const jiraApi = new JiraAPI(stateStorage)

    const onChange = (e) => {
        const searchQuery = e.target.value

        dispatch(setSearchQuery(searchQuery))
    }

    useAutofocus(inputRef, true)
    useEffect(() => {
        inputRef.current.addEventListener('search', onChange)

        return () => {
            inputRef.current.removeEventListener('search', onChange)
        }
    })

    return (
        <ons-search-input
            ref={inputRef}
            type="search"
            style={{ width: '100%' }}
            placeholder="Search"
        />
    )
}