
export function getMilliseconds(minutes) {
    return Number(minutes) * 1000 * 60
}

export function getMinutes(milliseconds) {
    return milliseconds / (1000 * 60)
}

/**
 * @abstract
 */
class AbstractStorage {
    static DEFAULT_NOTIFICATION_INTERVAL = 1000 * 60 * 60 // 1 hour
    static DEFAULT_UPDATE_INTERVAL = 1000 * 60 * 5 // 5 minutes

    /**
     * @abstract
     * @param {string} schemeAndHost 
     */
    setSchemeAndHost(schemeAndHost) { }
    /**
     * @abstract
     * @returns {string}
     */
    getSchemeAndHost() { }

    /**
     * @abstract
     * @param {string} token 
     */
    setApiToken(token) { }
    /**
     * @returns {string}
     */
    getApiToken() { }

    /**
     * @abstract
     * @param {string} username 
     */
    setUserName(username) { }
    /**
     * @abstract
     */
    getUserName() { }

    /**
     * @abstract
     * @param {number} interval 
     * @param {bool} isMinutesProvided 
     */
    setNotificationInterval(interval, isMinutesProvided = false) { }
    /**
     * @abstract
     * @param {bool} useMinutes 
     */
    getNotificationInterval(useMinutes = false) { }

    /**
     * @abstract
     * @param {number} interval 
     * @param {bool} isMinutesProvided 
     */
    setUpdateInterval(interval, isMinutesProvided = false) { }
    /**
     * @abstract
     * @param {bool} useMinutes 
     */
    getUpdateInterval(useMinutes = false) { }
}

export default AbstractStorage