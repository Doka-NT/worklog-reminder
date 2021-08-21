import { CarouselItem } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import { selectHost, setHost } from "../../../Store/settingsSlice"
import NavButtons from "../Components/NavButtons"
import SlideInput from "../Components/SlideInput"

export default function SlideHost(props) {
    const dispatch = useDispatch()
    const hostname = useSelector(selectHost)

    const onChange = e => {
        dispatch(setHost(e.value))
    }

    return (
        <CarouselItem>
            <div className="slide slide-2">
                <div className="title">Step 1. Jira URL</div>
                <div className="content">
                    <p>Provide your JIRA server URL</p>
                    <p>You can find this value in your browser by copying URL</p>

                    <SlideInput
                        value={hostname}
                        focusedOnIndex={props.index}
                        onChange={onChange}
                        placeholder="https://my-company.atlassian.net" />
                </div>

                <NavButtons />
            </div>
        </CarouselItem>
    )
}