import { Icon, Toolbar, ToolbarButton } from 'react-onsenui';
import { useDispatch } from 'react-redux';
import { showScreen } from '../../../Store/appSlice';
import ScreenDict from '../../ScreenDict';
import { loadIssuesAsync, setForceReload, setSearchQuery } from '../slice';

export default function IssuesToolbar() {
  const dispatch = useDispatch();

  const onReloadClick = () => {
    dispatch(setForceReload());
    dispatch(setSearchQuery(''));
    dispatch(loadIssuesAsync(''));
  };

  const onSettingsClick = () => {
    dispatch(showScreen(ScreenDict.SETTINGS));
  };

  return (
    <Toolbar>
      <div className="left">
        <ToolbarButton onClick={onReloadClick}>
          <Icon icon="fa-sync-alt" />
        </ToolbarButton>
      </div>
      <div className="center">Issues</div>
      <div className="right">
        <ToolbarButton onClick={onSettingsClick}>
          <Icon icon="fa-cog" />
        </ToolbarButton>
      </div>
    </Toolbar>
  );
}
