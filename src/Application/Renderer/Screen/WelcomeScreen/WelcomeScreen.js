import { useRef } from 'react'
import { Carousel, Page, ProgressBar } from 'react-onsenui'
import { useDispatch, useSelector } from 'react-redux'
import { selectIndex, slideBecomeVisible } from './slice'
import SlideAboutToken from './slides/SlideAboutToken'
import SlideBegin from './slides/SlideBegin'
import SlideHost from './slides/SlideHost'
import SlideToken from './slides/SlideToken'
import SlideUsername from './slides/SlideUsername'
import './style.less'


export function WelcomeScreen() {
    const carouselRef = useRef(null)
    const index = useSelector(selectIndex)

    const dispatch = useDispatch()

    const onPostChange = (e) => {
        dispatch(slideBecomeVisible(e.activeIndex))
    }

    return (
        <Page className="screen screen__welcome">
            <ProgressBar id="progressBar" value={0}></ProgressBar>
            <div className="carousel-wrapper">
                <Carousel
                    id="carousel"
                    onPostChange={onPostChange}
                    ref={carouselRef}
                    index={index}
                >
                    <SlideBegin index={0}/>
                    <SlideHost index={1}/>
                    <SlideUsername index={2}/>
                    <SlideAboutToken index={3}/>
                    <SlideToken index={4}/>
                </Carousel>
            </div>
        </Page>
    )
}