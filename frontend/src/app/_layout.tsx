import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				title: '',
				headerTintColor: 'black',
				headerTitleStyle: {
					fontWeight: 'bold'
				},
				animation: 'fade'
			}}>
		</Stack>
	);
}