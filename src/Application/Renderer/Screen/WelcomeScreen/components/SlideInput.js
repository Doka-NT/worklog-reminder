import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleSlide, showNext } from "../slice";

export default function SlideInput(_props) {
    const defaults = {
        focusedOnIndex: null,
        modifier: 'underbar',
        autoFocus: false,
        style: {
            width: '100%'
        }
    }

    const props = { ...defaults, ..._props }

    const dispatch = useDispatch()
    const currentSlideIndex = useSelector(selectVisibleSlide)
    const inputRef = useRef(null)

    const autofocus = currentSlideIndex === props.focusedOnIndex

    const onEnter = e => {
        if (e.code.toLowerCase() !== 'enter') {
            return
        }

        dispatch(showNext())
    }

    useEffect(() => {
        if (autofocus) {
            inputRef?.current.focus()
        }
    }, [autofocus])

    return (
        <ons-input
            ref={inputRef}
            {...props}
            onKeyPress={onEnter}
        />
    )
}