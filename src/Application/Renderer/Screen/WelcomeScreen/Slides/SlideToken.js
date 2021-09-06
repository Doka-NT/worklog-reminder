import { CarouselItem, Icon } from 'react-onsenui';
import { useDispatch, useSelector } from 'react-redux';
import JiraAPI from '../../../../../Infrastructure/JiraAPI/JiraAPI';
import StateStorage from '../../../../../Infrastructure/Storage/StateStorage';
import {
  showBadCredentialsNotification,
  showConnectionNotification,
  showSuccessfullyConnectedNotification,
  showZeroIssuesNotifications,
} from '../../../Notifications';
import { showScreen } from '../../../Store/appSlice';
import {
  selectSettings, selectToken, setOnboardingPassed, setToken,
} from '../../../Store/settingsSlice';
import ScreenDict from '../../ScreenDict';
import NavButtons from '../Components/NavButtons';
import SlideInput from '../Components/SlideInput';
import { resetWelcomeScreen } from '../slice';

export default function SlideToken(props) {
  const { index } = props;
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const settings = useSelector(selectSettings);

  const onChange = (e) => {
    dispatch(setToken(e.value));
  };

  const loadIssues = async () => {
    const jiraApi = new JiraAPI(new StateStorage(settings));
    let issues = [];

    try {
      issues = await jiraApi.searchIssues('');
    } catch (e) {
      showBadCredentialsNotification();
      console.error(e)
    }

    return issues;
  };

  const onBtnClick = () => {
    JiraAPI.flushCache();

    showConnectionNotification();

    loadIssues()
      .then((issues) => {
        if (issues.length > 0) {
          showSuccessfullyConnectedNotification();

          dispatch(showScreen(ScreenDict.CHECK_TOKEN));
          dispatch(resetWelcomeScreen());
          dispatch(setOnboardingPassed(true));

          return;
        }

        showZeroIssuesNotifications();
      });
  };

  return (
    <CarouselItem>
      <div className="slide slide-5">
        <div className="title">Almost done</div>
        <div className="content">
          <div className="finish-icon-block">
            <Icon className="icon" icon="fa-thumbs-up" style={{ height: '40px' }} />
          </div>
          <p>Enter your newly created token bellow to finish setup</p>
          <SlideInput
            value={token}
            onChange={onChange}
            focusedOnIndex={index}
            type="password"
            placeholder="API Token"
          />
        </div>

        <NavButtons
          nextBtnProps={{
            text: 'Finish!',
            onClick: onBtnClick,
          }}
        />
      </div>
    </CarouselItem>
  );
}
