import { CarouselItem } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsername, setUsername } from '../../../Store/settingsSlice';
import NavButtons from '../Components/NavButtons';
import SlideInput from '../Components/SlideInput';

export default function SlideUsername(props) {
  const { index } = props;
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  const onChange = (e) => {
    dispatch(setUsername(e.value));
  };

  return (
    <CarouselItem>
      <div className="slide slide-3">
        <div className="title">Step 2. Username</div>
        <div className="content">
          <p>Provide your JIRA username</p>
          <p>In most cases it is your email address</p>
          <SlideInput
            value={username}
            onChange={onChange}
            focusedOnIndex={index}
            placeholder="jsmith@examaple.com"
          />
        </div>

        <NavButtons />
      </div>
    </CarouselItem>
  );
}
