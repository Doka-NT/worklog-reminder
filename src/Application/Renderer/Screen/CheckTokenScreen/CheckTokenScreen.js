import imgSpinner from '../../../../../static/spinner.gif'

export default function CheckTokenScreen() {
    return (
        <section className="screen screen__check-token">
            <img src={imgSpinner} style={{width: '100%'}} />
        </section>
    )
}