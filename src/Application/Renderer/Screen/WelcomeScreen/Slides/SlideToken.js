import { CarouselItem, Icon } from "react-onsenui"
import { useDispatch, useSelector } from "react-redux"
import JiraAPI from "../../../../../Infrastructure/JiraAPI/JiraAPI"
import { showScreen } from "../../../appSlice"
import { selectToken, setToken } from "../../../Store/settingsSlice"
import ScreenDict from "../../ScreenDict"
import NavButtons from "../Components/NavButtons"
import SlideInput from "../Components/SlideInput"
import { resetWelcomeScreen } from "../slice"

export default function SlideToken(props) {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)

    const onChange = e => {
        dispatch(setToken(e.value))
    }

    const onBtnClick = () => {
        JiraAPI.flushCache()
        dispatch(showScreen(ScreenDict.CHECK_TOKEN))
        dispatch(resetWelcomeScreen())
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
                        value={token}
                        onChange={onChange}
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