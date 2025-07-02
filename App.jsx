import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {
  notificationListener,
  requestUserPermission,
} from './src/utilis/NotificationServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import {PermissionsAndroid, Platform} from 'react-native';
const App = () => {
  useEffect(() => {
    requestNotificationPermission();
    requestUserPermission();
    notificationListener();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS')
          .then(response => {
            if (!response) {
              PermissionsAndroid.request(
                'android.permission.POST_NOTIFICATIONS',
                {
                  title: 'Notification',
                  message:
                    'App needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
            }
          })
          .catch(err => {
            console.log('Notification Error=====>', err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return <Navigation />;
};

export default App;
