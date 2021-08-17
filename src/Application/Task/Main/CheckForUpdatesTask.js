import path from 'path'
import {app, dialog, shell} from 'electron'
import AbstractIntervalTask from "../AbstractIntervalTask";
import fetch from "node-fetch";
import config from "../../../app.config.main";

const repositoryName = 'Doka-NT/worklog-reminder'
const githubHost = 'https://github.com'
const updaterHost = 'https://update.electronjs.org'
const releasePage = 'releases/latest'

class CheckForUpdatesTask extends AbstractIntervalTask
{
    _iteration() {
        const url = `${updaterHost}/${repositoryName}/${process.platform}-${process.arch}/${app.getVersion()}`

        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    // update is available
                    this.onUpdateAvailable()
                } else if (response.status === 204) {
                    // app is up to date
                    console.log('Application is up to date')
                } else {
                    // no updates or other state/error
                    console.log('Updates is not available')
                }
            });
    }

    onUpdateAvailable()
    {
        const dialogOpts = {
            type: 'info',
            buttons: ['Download now', 'Later'],
            defaultId: 0,
            cancelId: 1,
            title: 'Application Update',
            icon: path.join(config.assetsDir, 'appIconColored.png'),
            detail: 'A new version of Worklog Reminder is available. Do you want to download it now?',
        }

        dialog.showMessageBox(dialogOpts).then(({ response }) => {
            if (response === 0) {
                shell.openExternal(`${githubHost}/${repositoryName}/${releasePage}`)
            }
        })

        // once message dialog is shown, stop checking updates
        this.stop()
    }
}

export default CheckForUpdatesTask
