import 'onsenui'

export default function TextInput(_props) {
    const predefined = {
        class: 'text-input'
    }

    const props = {...predefined, ..._props}

    return (
        <ons-input modifier="underbar" {...props}></ons-input>
    )
}