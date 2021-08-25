import { Button } from "react-onsenui"
import { useDispatch } from "react-redux"
import { showNext } from "../slice"


export default function NextButton(_props) {
  const dispatch = useDispatch()

  const defaults = {
    text: 'Next',
    className: 'btn-next',
    onClick: () => dispatch(showNext()),
  }

  const props = { ...defaults, ..._props }

  return (
    <Button {...props}>
      {props.text}
    </Button>
  )
}