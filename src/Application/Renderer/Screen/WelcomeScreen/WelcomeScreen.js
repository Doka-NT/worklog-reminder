import { useRef } from 'react';
import { Carousel, Page, ProgressBar } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIndex, selectProgress, setProgress, slideBecomeVisible,
} from './slice';
import SlideAboutToken from './Slides/SlideAboutToken';
import SlideBegin from './Slides/SlideBegin';
import SlideHost from './Slides/SlideHost';
import SlideToken from './Slides/SlideToken';
import SlideUsername from './Slides/SlideUsername';
import './style.less';

export default function WelcomeScreen() {
  const carouselRef = useRef(null);
  const index = useSelector(selectIndex);
  const progress = useSelector(selectProgress);

  const slidesCount = 5;
  const progressStep = 100 / slidesCount;

  const dispatch = useDispatch();

  const onPostChange = (e) => {
    dispatch(slideBecomeVisible(e.activeIndex));
    dispatch(setProgress(e.activeIndex * progressStep));
  };

  return (
    <Page className="screen screen__welcome">
      <ProgressBar id="progressBar" value={progress} />
      <div className="carousel-wrapper">
        <Carousel
          id="carousel"
          onPostChange={onPostChange}
          ref={carouselRef}
          index={index}
        >
          <SlideBegin index={0} />
          <SlideHost index={1} />
          <SlideUsername index={2} />
          <SlideAboutToken index={3} />
          <SlideToken index={4} />
        </Carousel>
      </div>
    </Page>
  );
}
