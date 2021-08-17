import { CarouselItem, Input } from "react-onsenui"
import { useDispatch } from "react-redux"
import NavButtons from "../components/NavButtons"
import SlideInput from "../components/SlideInput"
import { showNext } from "../slice"

export default function SlideHost(props) {
    const onHostChange = e => {
        
    }

    return (
        <CarouselItem>
            <div className="slide slide-2">
                <div className="title">Step 1. Jira URL</div>
                <div className="content">
                    <p>Provide your JIRA server URL</p>
                    <p>You can find this value in your browser by copying URL</p>

                    <SlideInput
                        focusedOnIndex={props.index}
                        onChange={onHostChange}
                        placeholder="https://my-company.atlassian.net" />
                </div>

                <NavButtons />
            </div>
        </CarouselItem>
    )
}