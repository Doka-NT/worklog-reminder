import 'onsenui';
import { useEffect, useRef } from "react";
import useAutofocus from '../Hooks/useAutofocus';

export default function Input(_props) {
    const defaults = {
        isFocused: false,
        value: '',
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
        inputRef.current.value = props.value
    })

    useAutofocus(inputRef, props.autofocus)

    return (
        <ons-input
            ref={inputRef}
            {...props}
            onKeyPress={onEnter}
        />
    )
}