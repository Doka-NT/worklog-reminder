class AbstractScreen {
    /**
     * @param {String} name
     * @param {ScreenManager} sm
     */
    constructor(name, sm) {
        this.name = name
        this.sm = sm
        this.html = ''
        this.children = []
    }

    _beforeRender() {}

    _afterRender() {}

    /**
     * @param {Element} containerEl
     * @private
     */
    _render(containerEl) {
        containerEl.innerHTML = this.html
        this.children.forEach(el => containerEl.appendChild(el))
    }

    show(containerEl) {
        this._beforeRender()
        this._render(containerEl)
        this._afterRender()
    }
}

export default AbstractScreen
