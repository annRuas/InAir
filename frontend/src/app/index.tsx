import { router, useRootNavigationState } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/SessionProvider';
export default function Index() {
	const rootNavigationState = useRootNavigationState()
	const navigatorReady = rootNavigationState?.key != null
	const authContext = useContext(AuthContext);

	useEffect(() => {
		if(!navigatorReady) return;

		if(authContext.session === null) {
			return router.replace('/welcome');
		}


	}, [navigatorReady])
    
	return null;
}

