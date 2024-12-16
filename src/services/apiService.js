import axios from 'axios';
import {
  startForegroundService,
  updateNotification,
  displaySuccessNotification,
  stopForegroundService,
} from './notificationService';

const MOCK_API = 'https://675ab01b099e3090dbe59ac0.mockapi.io/Image';

export const uploadImageWithProgress = async (image, setProgress, id) => {
  const imageData = {
    imageURL: image.uri,
    name: image.fileName || 'Unnamed Image',
    description: 'Image uploaded via MockAPI',
  };

  try {
 
    await startForegroundService(id, 0);

    await axios.post(MOCK_API, imageData, {
      headers: { 'Content-Type': 'application/json' },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload progress: ${progress}%`);

       
        setProgress(id, progress);

       
        updateNotification(id, progress);
      },
    });

   
    await displaySuccessNotification(id);

  
    await stopForegroundService(id);
  } catch (error) {
    console.error('Upload failed:', error);

 
    await stopForegroundService(id);
  }
};
