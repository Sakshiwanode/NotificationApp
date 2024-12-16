import notifee from '@notifee/react-native';

export const requestPermissions = async () => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus === notifee.AuthorizationStatus.AUTHORIZED) {
    console.log('Notification permission granted');
  } else {
    console.warn('Notification permission denied');
  }
};

export const createNotificationChannel = async () => {
  return await notifee.createChannel({
    id: 'upload-channel',
    name: 'Image Uploads',
  });
};

export const startForegroundService = async (id, progress) => {
  const channelId = await createNotificationChannel();

  await notifee.registerForegroundService(() =>
    notifee.displayNotification({
      id: `upload-${id}`,
      title: 'Uploading Image...',
      body: `Progress: ${progress}%`,
      android: {
        channelId,
        progress: { max: 100, current: progress, indeterminate: false },
        smallIcon: 'ic_launcher',
      },
    })
  );
};

export const updateNotification = async (id, progress) => {
  const channelId = await createNotificationChannel();

  await notifee.displayNotification({
    id: `upload-${id}`,
    title: 'Uploading Image...',
    body: `Progress: ${progress}%`,
    android: {
      channelId,
      progress: { max: 100, current: progress, indeterminate: false },
      smallIcon: 'ic_launcher',
    },
  });
};

export const displaySuccessNotification = async (id) => {
  const channelId = await createNotificationChannel();

  await notifee.displayNotification({
    id: `upload-${id}`,
    title: 'Upload Successful!',
    body: 'Your image has been uploaded successfully.',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
    },
  });
};

export const stopForegroundService = async (id) => {
  await notifee.stopForegroundService();
};
