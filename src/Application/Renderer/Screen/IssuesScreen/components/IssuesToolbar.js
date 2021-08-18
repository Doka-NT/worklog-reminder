import { Toolbar, ToolbarButton, Icon } from "react-onsenui"

export default function IssuesToolbar() {
    return (
        <Toolbar>
            <div className="left">
                <ToolbarButton id="btnReload">
                    <Icon icon="fa-sync-alt" />
                </ToolbarButton>
            </div>
            <div className="center">Issues</div>
            <div className="right">
                <ToolbarButton id="btnSettings">
                    <Icon icon="fa-cog"/>
                </ToolbarButton>
            </div>
        </Toolbar>
    )
}