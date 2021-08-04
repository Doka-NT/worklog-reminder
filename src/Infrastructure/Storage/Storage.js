const LS_SCHEME_AND_HOST = 'scheme-and-host'
const LS_TOKEN = 'access-token'
const LS_USERNAME = 'username'
const LS_INTERVAL = 'interval'

const DEFAULT_INTERVAL = 1000 * 60 * 60 // 1 hour

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

    setNotificationInterval(interval, isSecondsProvided = false) {
        const value = Number(interval) * (isSecondsProvided ? 1000 : 1)

        localStorage.setItem(LS_INTERVAL, `${value}`)
    }

    getNotificationInterval(useSeconds = false) {
        const value = Number(localStorage.getItem(LS_INTERVAL))

        return (value > 0 ? value : DEFAULT_INTERVAL) / (useSeconds ? 1000 : 1)
    }
}

export default Storage;
