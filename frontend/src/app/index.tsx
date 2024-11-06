import { router, useRootNavigationState } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/SessionProvider';
import { getUserInformation } from '../actions/user.actions';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../configs/firebaseConfig';

initializeApp(firebaseConfig)

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

			authContext.userInformation = data;

			return router.replace('/Home');
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

