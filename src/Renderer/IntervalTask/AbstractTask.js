/**
 * @abstract
 */
class AbstractTask
{
    static __interval

    /**
     * @param {Number} intervalSeconds
     */
    start(intervalSeconds)
    {
        this.constructor.__interval = setInterval(this._iteration.bind(this), intervalSeconds)
    }

    stop()
    {
        if (!this.constructor.__interval) {
            return
        }

        clearInterval(this.constructor.__interval);
    }

    restart(intervalSeconds)
    {
        this.stop()
        this.start(intervalSeconds)
    }

    /**
     * @abstract
     * @protected
     */
    _iteration()
    {
        throw new Error('You have to implement iteration method')
    }
}

export default AbstractTask
