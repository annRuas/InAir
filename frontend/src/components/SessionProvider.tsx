import { createContext, type PropsWithChildren, useState } from 'react';

type UserInformation = {
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
	session: string | null;
	userInformation: UserInformation | null;
	locations: Location[] | null;
}

export const AuthContext = createContext<AuthContextInterface>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	userInformation: null,
	locations: null
});


export function SessionProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<string | null>(null);
	let userInformation = null;
	let locations = null;
	return (
		<AuthContext.Provider
			value={{
				signIn: (uid: string) => {
					setSession(uid)
					userInformation = null;
				},
				signOut: () => setSession(null),
				session,
				userInformation,
				locations,
			}}>
			{children}
		</AuthContext.Provider>
	);
}