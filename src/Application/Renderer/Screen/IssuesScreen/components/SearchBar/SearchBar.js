import 'onsenui'
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import JiraAPI from '../../../../../../Infrastructure/JiraAPI/JiraAPI'
import useAutofocus from "../../../../Hooks/useAutofocus"
import { selectSearchQuery, setForceReload, setSearchQuery } from "../../slice"

export default function SearchBar() {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const searchQuery = useSelector(selectSearchQuery)

    const onChange = (e) => {
        const searchQuery = e.target.value

        dispatch(setSearchQuery(searchQuery))
    }

    useAutofocus(inputRef, true)
    useEffect(() => {
        inputRef.current.addEventListener('search', onChange)
        inputRef.current.value = searchQuery

        return () => {
            inputRef.current?.removeEventListener('search', onChange)
        }
    })

    return (
        <ons-search-input
            ref={inputRef}
            type="search"
            style={{ width: '100%' }}
            value={searchQuery}
            placeholder="Search"
        />
    )
}