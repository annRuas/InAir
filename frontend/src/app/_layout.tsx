import { Slot, Stack } from 'expo-router';
import { SessionProvider } from '../components/SessionProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SessionProvider>
				<Slot />
			</SessionProvider>
		</GestureHandlerRootView>
	);
}