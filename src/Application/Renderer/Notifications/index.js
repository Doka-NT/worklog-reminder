import ons from 'onsenui';

export const showConnectionNotification = () => {
  ons.notification.toast('💡 Trying to connect to JIRA....', {
    timeout: 1000,
  });
};

export const showBadCredentialsNotification = () => {
  ons.notification.toast(
    '🚫 <b>Error!</b><p>Check credentials and Jira URL</p>In some cases it could be permission issue',
    {
      force: true,
      timeout: 5000,
    },
  );
};

export const showSuccessfullyConnectedNotification = () => {
  ons.notification.toast('✅ All done! Your are awesome!', {
    timeout: 2000,
  });
};

export const showZeroIssuesNotifications = () => {
  ons.notification.toast(
    '⚠️ Jira return 0 issues. Check your Jira URL and username', {
      force: true,
      timeout: 2000,
    },
  );
};

export const showWorklogAddedNotification = () => {
  ons.notification.toast('Worklog added!', {
    timeout: 1000,
  });
};

export const showCommentSavedNotification = () => {
  ons.notification.toast('Worklog comment has been saved', {
    timeout: 2000,
  });
};

export const showRequestFailedWarning = () => {
  ons.notification.toast('⚠️ Request failed. Try again later, please!', {
    timeout: 1000,
  })
}