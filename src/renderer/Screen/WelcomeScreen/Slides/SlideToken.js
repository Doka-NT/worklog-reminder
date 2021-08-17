import { CarouselItem, Icon, Input } from "react-onsenui"
import NavButtons from "../components/NavButtons"

export default function SlideToken() {
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
                    <Input style={{ width: '100%' }} id="fieldToken" type="password" modifier="underbar" placeholder="API Token"></Input>
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