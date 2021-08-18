import { useEffect, useRef } from "react";
import 'onsenui'

export default function Input(_props) {
    const defaults = {
        onChange: () => {},
        onEnter: () => {},
    }

    const props = { ...defaults, ..._props }

    const inputRef = useRef(null)

    const onEnter = e => {
        if (e.code.toLowerCase() !== 'enter') {
            return
        }

        props.onEnter(e)
    }

    useEffect(() => {
        inputRef.current.onchange = e => {
            const event = {
                type: e.type,
                value: e.target.value,
                originEvent: e,
            }
            
            props.onChange(event)
        }
    })

    return (
        <ons-input
            ref={inputRef}
            {...props}
            onKeyPress={onEnter}
        />
    )
}