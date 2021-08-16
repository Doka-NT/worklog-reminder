import { CarouselItem, Button } from "react-onsenui"
import { useDispatch } from "react-redux"
import EventDict from "../../../../../src/Domain/Dictionary/EventDict"
import UrlDict from "../../../../../src/Domain/Dictionary/UrlDict"
import EventEmitter from "../../../../../src/Event/EventEmitter"
import NavButtons from "../components/NavButtons"
import { showNext } from "../slice"


export default function SlideAboutToken() {
    const dispatch = useDispatch()

    const goNextSlide = () => {
        dispatch(showNext())
    }

    const onClick = () => {
        EventEmitter.getInstance().send(EventDict.OPEN_IN_SHELL, UrlDict.URL_MANAGE_TOKEN)
        goNextSlide()
    }

    return (
        <CarouselItem>
            <div className="slide slide-4">
                <div className="title">Step 3. API Token</div>
                <div className="content">
                    <p>Now let's create an API token for this application</p>
                    <p>Just press "Create token" button bellow, and you will be redirected to the token management page</p>

                    <Button
                        className="btn-token-exists"
                        modifier="quiet"
                        onClick={goNextSlide}
                        >Click here if you already have a token</Button>
                </div>

                <NavButtons
                    nextBtnProps={{
                        text: "Create token",
                        onClick: onClick,
                    }}
                />
            </div>
        </CarouselItem>
    )
}