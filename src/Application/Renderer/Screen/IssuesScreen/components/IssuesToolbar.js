import { Toolbar, ToolbarButton, Icon } from "react-onsenui"
import { useDispatch } from "react-redux"
import { showScreen } from "../../../appSlice"
import ScreenDict from "../../ScreenDict"

export default function IssuesToolbar() {
    const dispatch = useDispatch()

    const onSettingsClick = () => {
        dispatch(showScreen(ScreenDict.ACCESS_TOKEN))
    }

    return (
        <Toolbar>
            <div className="left">
                <ToolbarButton id="btnReload">
                    <Icon icon="fa-sync-alt" />
                </ToolbarButton>
            </div>
            <div className="center">Issues</div>
            <div className="right">
                <ToolbarButton onClick={onSettingsClick}>
                    <Icon icon="fa-cog"/>
                </ToolbarButton>
            </div>
        </Toolbar>
    )
}