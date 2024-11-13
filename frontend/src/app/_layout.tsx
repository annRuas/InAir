import { Slot, Stack } from 'expo-router';
import { SessionProvider } from '../components/SessionProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Layout() {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SessionProvider>
					<Slot />
				</SessionProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}