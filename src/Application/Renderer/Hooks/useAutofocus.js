import { useEffect } from "react"

export default function useAutofocus(inputRef, autofocus) {
    useEffect(() => {
        if (autofocus && inputRef.current !== null) {
            setTimeout(() => {
                // todo: detect why ons-input has lag
                console.log('autofocus for', inputRef.current)
                inputRef.current._input.focus()
            }, 500)
            
        } 
    }, [autofocus])
}