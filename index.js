import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';
import './src/tasks/backgroundTask';


notifee.onBackgroundEvent(async ({ type, detail}) => {
  if (type === notifee.EventType.PRESS) {
    console.log('Notification Pressed:', detail.notification);
  }
});

AppRegistry.registerComponent(appName, () => App);
