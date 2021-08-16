import { CarouselItem, Input } from "react-onsenui"
import NavButtons from "../components/NavButtons"

export default function SlideHost() {
    return (
        <CarouselItem>
            <div className="slide slide-2">
                <div className="title">Step 1. Jira URL</div>
                <div className="content">
                    <p>Provide your JIRA server URL</p>
                    <p>You can find this value in your browser by copying URL</p>
                    <Input style={{ width: '100%' }} id="fieldSchemeAndHost" modifier="underbar" placeholder="https://my-company.atlassian.net"></Input>
                </div>

                <NavButtons/>
            </div>
        </CarouselItem>
    )
}