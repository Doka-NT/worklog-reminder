import NextButton from "./NextButton"
import PrevButton from "./PrevButton"

export default function NavButtons(_props) {

    const _defaults = {
        nextBtnProps: {},
    }

    const props = {..._defaults, ..._props}
    console.log('NAV', _props, props)

    return (
        <div className="buttons">
            <PrevButton/>            
            <NextButton {...props.nextBtnProps}/>
        </div>
    )
}