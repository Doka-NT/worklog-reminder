import Issue from "../../Domain/Issue/Issue";
import hash from 'object-hash'
import AbstractStorage from "../Storage/AbstractStorage";


const cacheTtl = 30

class JiraAPI {
    static __cache = {}
    static __instance

    static flushCache() {
        JiraAPI.__cache = {}
    }

    /**
     * @param {AbstractStorage} storage 
     */
    constructor(storage) {
        this.storage = storage
    }

    searchByKeyOrText(searchText)
    {
        if (!searchText) {
            return this.searchIssues('')
        }

        return this
            ._fetch(`/rest/api/2/issue/${encodeURI(searchText)}?fields=summary,issuetype`)
            .then(result => {
                const summary = result.fields?.summary

                if (!summary) {
                    return this.searchIssues(searchText)
                }

                return [new Issue(result.key, summary, result.fields.issuetype.iconUrl)]
            })
    }

    /**
     * @return {Promise<*[]>}
     */
    searchIssues(searchText = '')
    {
        const searchQuery = searchText ? `summary ~ "${searchText}"` : ''
        const jql = `${searchQuery} order by lastViewed`

        return this._fetch(`/rest/api/2/search?jql=${encodeURI(jql)}`)
            .then(result => {
                const issues = []

                result.issues.forEach(item => {
                    const issue = new Issue(
                        item.key,
                        item.fields.summary,
                        item.fields.issuetype.iconUrl,
                        `${this.storage.getSchemeAndHost()}/browse/${item.key}`
                    )

                    issues.push(issue)
                })

                return issues
            })
    }

    /**
     * @param {Worklog} worklog
     */
    addWorklog(worklog) {
        return this
            ._fetch(`/rest/api/2/issue/${worklog.issue.key}/worklog`, 'POST', {
                body: JSON.stringify({
                    timeSpent: worklog.time
                })
            })
    }

    updateWorklog(worklog, comment) {
        return this._fetch(`/rest/api/2/issue/${worklog.issue.key}/worklog/${worklog.id}`, 'PUT', {
            body: JSON.stringify({
                comment: comment
            })
        })
    }

    flushCache()
    {
        JiraAPI.flushCache()
    }

    getIssueUrl(issueKey)
    {
        return `${this.storage.getSchemeAndHost()}/browse/${issueKey}`
    }

    _fetch(path, method = 'GET', options = {}) {
        // todo move to another class
        const cacheKey = this.__getCacheKey([path, method, options])
        const cachedData = this.__getCache(cacheKey)

        if (cachedData && method === 'GET') {
            return new Promise(resolve => resolve(cachedData))
        }

        // end todo
        const schemeAndHost = this.storage.getSchemeAndHost();
        const userName = this.storage.getUserName()
        const apiToken = this.storage.getApiToken()

        const headers = new Headers({
            'Authorization': `Basic ${Buffer.from(`${userName}:${apiToken}`).toString('base64')}`,
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
        });

        options = Object.assign({
            method: method,
            headers: headers,
        }, options)

        return fetch(`${schemeAndHost}${path}`, options)
            .then(response => {
                const result = response.json()

                this.__setCache(cacheKey, result)

                return result
            })
    }

    // todo: move to another class
    __getCacheKey(object) {
        return hash(object)
    }

    __setCache(key, value) {
        JiraAPI.__cache[key] = {
            expiredAt: this.__getCurrentTime() + cacheTtl,
            data: value
        }
    }

    __getCache(key) {
        const cacheItem = JiraAPI.__cache[key] ?? null

        if (!cacheItem || cacheItem.expiredAt < this.__getCurrentTime()) {
            return null
        }

        return cacheItem.data
    }

    __deleteCache(key) {
        delete JiraAPI.__cache[key]
    }

    __getCurrentTime() {
        return Math.floor(Date.now() / 1000);
    }
}

export default JiraAPI
