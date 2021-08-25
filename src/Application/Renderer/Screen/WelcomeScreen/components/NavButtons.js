import NextButton from "./NextButton"
import PrevButton from "./PrevButton"

export default function NavButtons(_props) {

  const _defaults = {
    nextBtnProps: {},
  }

  const props = { ..._defaults, ..._props }

  return (
    <div className="buttons">
      <PrevButton />
      <NextButton {...props.nextBtnProps} />
    </div>
  )
}