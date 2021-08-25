import Input from '../../../Components/Input'

export default function TextInput(_props) {
  const predefined = {
    class: 'text-input'
  }

  const props = { ...predefined, ..._props }

  return (
    <Input
      modifier="underbar"
      {...props}
    />
  )
}