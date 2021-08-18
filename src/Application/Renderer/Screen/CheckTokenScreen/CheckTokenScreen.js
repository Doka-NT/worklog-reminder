import { useDispatch, useSelector } from 'react-redux'
import imgSpinner from '../../../../../static/spinner.gif'
import { selectSettings } from '../../Store/settingsSlice'
import StateStorage from '../../../../Infrastructure/Storage/StateStorage'
import JiraAPI from '../../../../Infrastructure/JiraAPI/JiraAPI'
import { useEffect } from 'react'
import { showScreen } from '../../appSlice'
import ScreenDict from '../ScreenDict'

export default function CheckTokenScreen() {
    const dispatch = useDispatch()
    const settingsState = useSelector(selectSettings)

    const storage = new StateStorage(settingsState)
    const jiraAPI = new JiraAPI(storage)

    const checkToken = () => {
        jiraAPI.searchIssues()
            .then(() => {
                console.log('TOKEN IS VALID')
                dispatch(showScreen(ScreenDict.ACCESS_TOKEN))
            })
            .catch(err => {
                console.error(err)
                dispatch(showScreen(ScreenDict.ACCESS_TOKEN))
                console.error('TOKEN IS INVALID')
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