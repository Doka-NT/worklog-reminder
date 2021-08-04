import JiraAPI from "../../Infrastructure/JiraAPI/JiraAPI";

const jiraAPI = new JiraAPI()

class Worklog {
    /**
     * @param {Issue} issue
     * @param {Number} time
     * @param {String} comment
     */
    constructor(issue, time, comment = '') {
        this.id = ''
        this.issue = issue
        this.time = time
        this.comment = comment
    }

    save() {
        return jiraAPI.addWorklog(this)
            .then(result => {
                console.log(result)
                this.id = result.id

                return result
            })
            .catch(error => console.error(error))
    }
}

export default Worklog
