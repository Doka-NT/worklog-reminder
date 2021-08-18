const LS_SCHEME_AND_HOST = 'scheme-and-host'
const LS_TOKEN = 'access-token'
const LS_USERNAME = 'username'
const LS_NOTIFICATION_INTERVAL = 'notification-interval'
const LS_UPDATE_INTERVAL = 'update-interval'



const getValue = key => {
    const value = localStorage.getItem(key)

    return value ? `${value}` : ''
}

class Storage {
    setSchemeAndHost(schemeAndHost) {
        localStorage.setItem(LS_SCHEME_AND_HOST, schemeAndHost)
    }

    getSchemeAndHost() {
        return getValue(LS_SCHEME_AND_HOST)
    }

    setApiToken(token) {
        localStorage.setItem(LS_TOKEN, token)
    }

    getApiToken() {
        return getValue(LS_TOKEN)
    }

    setUserName(username) {
        localStorage.setItem(LS_USERNAME, username)
    }

    getUserName() {
        return getValue(LS_USERNAME)
    }

    setNotificationInterval(interval, isMinutesProvided = false) {
        const value = Number(interval) * (isMinutesProvided ? 1000 * 60 : 1)

        localStorage.setItem(LS_NOTIFICATION_INTERVAL, `${value}`)
    }

    getNotificationInterval(useMinutes = false) {
        const value = Number(localStorage.getItem(LS_NOTIFICATION_INTERVAL))

        return (value > 0 ? value : DEFAULT_NOTIFICATION_INTERVAL) / (useMinutes ? 1000 * 60 : 1)
    }

    setUpdateInterval(interval, isMinutesProvided = false) {
        const value = Number(interval) * (isMinutesProvided ? 1000 * 60 : 1)

        localStorage.setItem(LS_UPDATE_INTERVAL, `${value}`)
    }

    getUpdateInterval(useMinutes = false) {
        const value = Number(localStorage.getItem(LS_UPDATE_INTERVAL))

        return (value > 0 ? value : DEFAULT_UPDATE_INTERVAL) / (useMinutes ? 1000 * 60 : 1)
    }
}

export default Storage;
