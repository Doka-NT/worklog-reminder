import { useEffect, useRef } from 'react'
import { Page, Carousel, CarouselItem, Icon, Input, Button, ProgressBar } from 'react-onsenui'
import { useDispatch, useSelector } from 'react-redux'
import { selectIndex, setSlide, showNext } from './slice'
import SlideAboutToken from './Slides/SlideAboutToken'
import SlideBegin from './Slides/SlideBegin'
import SlideHost from './Slides/SlideHost'
import SlideToken from './Slides/SlideToken'
import SlideUsername from './Slides/SlideUsername'

import './style.less'

export function WelcomeScreen() {
    const carouselRef = useRef(null)
    const index = useSelector(selectIndex)

    return (
        <Page className="screen screen__welcome">
            <ProgressBar id="progressBar" value={0}></ProgressBar>
            <div className="carousel-wrapper">
                <Carousel
                    id="carousel"
                    ref={carouselRef}
                    index={index}
                >
                    <SlideBegin/>
                    <SlideHost/>
                    <SlideUsername/>
                    <SlideAboutToken/>
                    <SlideToken/>
                </Carousel>
            </div>
        </Page>
    )
}