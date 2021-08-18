import TextInput from "./TextInput";

export default function WideTextInput(props) {
    const predefined = {
        modifier: null,
        class: 'text-input--wide'
    }

    return (
        <TextInput {...{...predefined, ...props}} />
    )
}