import { router, useRootNavigationState } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/SessionProvider';
import { getUserInformation, getUserLocations } from '../actions/user.actions';
import { auth } from '../configs/firebaseConfig';

export default function Index() {
	const rootNavigationState = useRootNavigationState()
	const navigatorReady = rootNavigationState?.key != null
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const loadInformation = async (uid: string) => {
			const { data, status } = await getUserInformation(uid);

			if(status === 404) {
				return router.replace('/auth/form');
			}

			authContext.setUserInformation(data);

			const { locations } = await getUserLocations(uid);
			authContext.setLocations(locations);

			return router.replace('/home');
		}

		if(!navigatorReady) return;

		if(authContext.session === null) {
			return router.replace('/welcome');
		}

		if(authContext.userInformation === null) {
			loadInformation(authContext.session);
			return;
		}

	}, [navigatorReady])
    
	return null;
}

