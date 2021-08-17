import AbstractScreen from "../AbstractScreen";
import html from './template.html'
import Screen from "../../Screen";
import SCREEN_DICT from "../../Screen";
import JiraAPI from "../../../Infrastructure/JiraAPI/JiraAPI";

const jiraAPI = new JiraAPI()

class CheckTokenScreen extends AbstractScreen
{
    _beforeRender() {
        super._beforeRender();
        this.html = html
    }

    _afterRender() {
        const checkToken = () => {

            jiraAPI.searchIssues()
                .then(() => {
                    this.sm.showScreen(SCREEN_DICT.ISSUES)
                })
                .catch(err => {
                    console.error(err)
                    this.sm.showScreen(Screen.ACCESS_TOKEN)
                });
        }

        checkToken()
    }
}

export default CheckTokenScreen
