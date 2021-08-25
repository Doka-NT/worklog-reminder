import { CarouselItem, Icon } from "react-onsenui"
import NextButton from "../Components/NextButton"

export default function SlideBegin() {
  return (
    <CarouselItem>
      <div className="slide slide-1">
        <div className="title">Worklog Reminder</div>
        <div className="content">
          <div className="row">
            <Icon className="icon" icon="fa-tasks"></Icon>
            <span className="icon-description">Watch through your last viewed JIRA issues</span>
          </div>
          <div className="row">
            <Icon className="icon" icon="fa-mouse-pointer"></Icon>
            <span className="icon-description">Track time in 1-2 clicks. Optionally provide a comment</span>
          </div>
          <div className="row">
            <Icon className="icon" icon="fa-clock"></Icon>
            <span className="icon-description">Schedule notifications to keep worklog actual</span>
          </div>
        </div>
        <div className="buttons">
          <NextButton text="Start" />
        </div>
      </div>
    </CarouselItem>
  )
}