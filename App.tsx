import React, { useEffect } from 'react';
import {  StyleSheet } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { requestPermissions } from './src/services/notificationService';
import ImageUploader from './src/Components/ImageUploader';


const Stack = createNativeStackNavigator();

const App = ({navigation}:any) => {
  useEffect(() => {
    
    requestPermissions();

   
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }:any) => {

     
      if (type === EventType.PRESS) {
        if (detail.notification.android?.clickAction === 'open_image_uploader') {
          console.log('Notification Pressed:', detail.notification);
          navigation.navigate('ImageUploader');
        }
      }
    });

    return () => unsubscribe(); 
  }, [navigation]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageUploader">
        <Stack.Screen name="ImageUploader" component={ImageUploader} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
