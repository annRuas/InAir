import { createContext, type PropsWithChildren, useState } from 'react';

type UserInformation = {
  email: string;
  name: string;
  dateOfBirth: Date;
  residence: string;
  diseases: string[];
}

type AuthContextInterface = {
    signIn: (uid: string) => void;
    signOut: () => void;
    session: string | null;
    userInformation: UserInformation | null;
}

export const AuthContext = createContext<AuthContextInterface>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    userInformation: null
});


export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  let userInformation = null;
  return (
    <AuthContext.Provider
      value={{
        signIn: (uid: string) =>  {
            setSession(uid)
            userInformation = null;
          },
        signOut: () => setSession(null),
        session,
        userInformation,
      }}>
      {children}
    </AuthContext.Provider>
  );
}