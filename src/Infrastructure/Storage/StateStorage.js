import AbstractStorage from "../../Domain/AbstractStorage"

export default class StateStorage extends AbstractStorage {
  constructor(state) {
    super()
    this.state = state
  }

  getSchemeAndHost() {
    return this.state.host
  }

  getUserName() {
    return this.state.username
  }

  getApiToken() {
    return this.state.token
  }

  getNotificationInterval(useMinutes = false) {
    const value = Number(this.state.notificationInterval)

    return (value > 0 ? value : this.constructor.DEFAULT_NOTIFICATION_INTERVAL) / (useMinutes ? 1000 * 60 : 1)
  }

  getUpdateInterval(useMinutes = false) {
    const value = Number(this.state.updateInterval)

    return (value > 0 ? value : this.constructor.DEFAULT_UPDATE_INTERVAL) / (useMinutes ? 1000 * 60 : 1)
  }
}