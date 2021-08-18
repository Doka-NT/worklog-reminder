import { Toolbar, BackButton } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import { showScreen } from "../../../appSlice"
import { selectIsSettingsFilled } from "../../../Store/settingsSlice"
import ScreenDict from "../../ScreenDict"

export default function SettingsToolbar() {
    const dispatch = useDispatch()
    const isSettingsFilled = useSelector(selectIsSettingsFilled)

    const onBackClick = () => {
        const screenName = isSettingsFilled ? ScreenDict.ISSUES : ScreenDict.WELCOME

        dispatch(showScreen(screenName))
    }

    return (
        <Toolbar>
            <div className="left">
                <BackButton onClick={onBackClick}>Back</BackButton>
            </div>
            <div className="center">Settings</div>
        </Toolbar>
    )
}