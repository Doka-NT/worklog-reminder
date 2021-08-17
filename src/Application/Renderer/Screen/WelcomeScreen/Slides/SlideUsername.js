import { CarouselItem, Input } from "react-onsenui"
import NavButtons from "../components/NavButtons"
import SlideInput from "../components/SlideInput"


export default function SlideUsername(props) {
    return (
        <CarouselItem>
            <div className="slide slide-3">
                <div className="title">Step 2. Username</div>
                <div className="content">
                    <p>Provide your JIRA username</p>
                    <p>In most cases it is your email address</p>
                    <SlideInput
                        focusedOnIndex={props.index}
                        placeholder="jsmith@examaple.com"
                    />
                </div>

                <NavButtons />
            </div>
        </CarouselItem>
    )
}