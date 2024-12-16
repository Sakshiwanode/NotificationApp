import notifee from '@notifee/react-native'

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    if (detail && detail.notification) {
      console.log('Notification Pressed in Background:', detail.notification);
    } else {
      console.warn('Background notification detail or notification is undefined');
    }
  }
});
