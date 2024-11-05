import { createContext, type PropsWithChildren, useState } from 'react';

type AuthContextInterface = {
    signIn: (uid: string) => void;
    signOut: () => void;
    session: string | null;
}

type UserInformation = {
  email: string;
  name: string;
  dateOfBirth: Date;
  residence: string;
  diseases: string[];
}

export const AuthContext = createContext<AuthContextInterface>({
    signIn: () => null,
    signOut: () => null,
    session: null
});


export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  let userData = null
  return (
    <AuthContext.Provider
      value={{
        signIn: (uid: string) =>  {
            setSession(uid)
          },
        signOut: () => setSession(null),
        session,
      }}>
      {children}
    </AuthContext.Provider>
  );
}