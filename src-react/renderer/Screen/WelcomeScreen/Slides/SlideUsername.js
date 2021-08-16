import { CarouselItem, Input } from "react-onsenui"
import NavButtons from "../components/NavButtons"


export default function SlideUsername() {
    return (
        <CarouselItem>
            <div className="slide slide-3">
                <div className="title">Step 2. Username</div>
                <div className="content">
                    <p>Provide your JIRA username</p>
                    <p>In most cases it is your email address</p>
                    <Input
                        style={{ width: '100%' }}
                        id="fieldUsername"
                        modifier="underbar"
                        placeholder="jsmith@examaple.com"/>
                </div>

                <NavButtons />
            </div>
        </CarouselItem>
    )
}