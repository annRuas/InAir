import { Slot, Stack } from 'expo-router';
import { SessionProvider } from '../components/SessionProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { isDevice } from 'expo-device';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = "374104de-eba0-4915-8cda-2ac5f457711c";
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}



export default function Layout() {
	const [expoPushToken, setExpoPushToken] = useState('')

	useEffect(()=> {
    registerForPushNotificationsAsync()
      .then(token => {
		console.log(token);
		setExpoPushToken(token ?? '')})

      .catch((error: any) => setExpoPushToken(`${error}`));

     
	}, [])
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SessionProvider notificationToken={expoPushToken}>
					<Slot />
				</SessionProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}