import { router, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
	const rootNavigationState = useRootNavigationState()
	const navigatorReady = rootNavigationState?.key != null

	useEffect(() => {
		if(!navigatorReady) return;

		router.replace('/welcome');
	}, [navigatorReady])
    
	return null;
}

