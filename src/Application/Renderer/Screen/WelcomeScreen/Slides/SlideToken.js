import { CarouselItem, Icon, Input } from "react-onsenui"
import NavButtons from "../components/NavButtons"
import SlideInput from "../components/SlideInput"

export default function SlideToken(props) {
    const onBtnClick = () => {

    }

    return (
        <CarouselItem>
            <div className="slide slide-5">
                <div className="title">Almost done</div>
                <div className="content">
                    <div className="finish-icon-block">
                        <Icon className="icon" icon="fa-thumbs-up" style={{ height: "40px" }}></Icon>
                    </div>
                    <p>Enter your newly created token bellow to finish setup</p>
                    <SlideInput
                        focusedOnIndex={props.index}
                        type="password"
                        placeholder="API Token" />
                </div>

                <NavButtons
                    nextBtnProps={{
                        text: 'Finish!',
                        onClick: onBtnClick,
                    }}
                />
            </div>
        </CarouselItem>
    )
}