import AbstractStorage from "./AbstractStorage";

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
}