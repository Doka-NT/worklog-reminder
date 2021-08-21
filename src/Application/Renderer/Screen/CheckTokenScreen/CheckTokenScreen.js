import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import imgSpinner from '../../../../../static/spinner.gif'
import JiraAPI from '../../../../Infrastructure/JiraAPI/JiraAPI'
import StateStorage from '../../../../Infrastructure/Storage/StateStorage'
import { showScreen } from '../../appSlice'
import { selectSettings } from '../../Store/settingsSlice'
import ScreenDict from '../ScreenDict'

export default function CheckTokenScreen() {
    const dispatch = useDispatch()
    const settingsState = useSelector(selectSettings)

    const storage = new StateStorage(settingsState)
    const jiraAPI = new JiraAPI(storage)

    const checkToken = () => {
        jiraAPI.searchIssues()
            .then(() => {
                dispatch(showScreen(ScreenDict.ISSUES))
            })
            .catch(err => {
                dispatch(showScreen(ScreenDict.ACCESS_TOKEN))
            });
    }

    useEffect(() => {
        checkToken()
    })

    return (
        <section className="screen screen__check-token">
            <img src={imgSpinner} style={{ width: '100%' }} />
        </section>
    )
}