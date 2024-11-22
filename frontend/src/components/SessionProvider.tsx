import { createContext, type PropsWithChildren, useEffect, useState } from 'react';

export type UserInformation = {
	email: string;
	name: string;
	dateOfBirth: string;
	residence: string;
	diseases: string[];
}

export type Location = {
	name: string;
	coordinates: {
		longitude: string;
		latitude: string;
	}
}

type AuthContextInterface = {
	signIn: (uid: string) => void;
	signOut: () => void;
	userInformation: UserInformation | null;
	setUserInformation: any;
	session: string | null;
	locations: Location[] | null;
	setLocations: any; 
	notificationToken: string | null;
}

export const AuthContext = createContext<AuthContextInterface>({
	signIn: () => null,
	signOut: () => null,
	userInformation: null,
	setUserInformation: null,
	session: null,
	locations: null,
	setLocations: null,
	notificationToken: null
});

type SessionProviderProps = {
	children: any;
	notificationToken: string;
}


export function SessionProvider({ children, notificationToken }: SessionProviderProps) {
	const [session, setSession] = useState<string | null>(null);
	const [userInformation, setUserInformation] = useState<null | UserInformation>(null);
	const [locations, setLocations] = useState<any>([]);

	return (
		<AuthContext.Provider
			value={{
				signIn: (uid: string) => {
					setSession(uid)
					setUserInformation(null);
				},
				signOut: () => {
					setSession(null);
					setUserInformation(null);
					setLocations(null);
				},
				session,
				userInformation,
				setUserInformation,
				locations,
				setLocations,
				notificationToken
			}}>
			{children}
		</AuthContext.Provider>
	);
}