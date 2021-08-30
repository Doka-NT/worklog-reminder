import JiraAPI from '../../Infrastructure/JiraAPI/JiraAPI';

class Worklog {
  /**
   * @param {Issue} issue
   * @param {Number} time
   * @param {String} comment
   */
  constructor(issue, time, comment = '') {
    this.id = '';
    this.issue = issue;
    this.time = time;
    this.comment = comment;
  }

  /**
   * @param {JiraAPI} jiraAPI
   * @returns {Promise}
   */
  save(jiraAPI) {
    return jiraAPI.addWorklog(this)
      .then((result) => {
        console.log(result);
        this.id = result.id;

        return this;
      })
      .catch((error) => console.error(error));
  }
}

export default Worklog;
