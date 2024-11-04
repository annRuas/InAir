import { useContext, createContext, type PropsWithChildren, useState } from 'react';



type UserInfo = {
    email?: string,
    uid?: string,
    name?: string
    hasCompletedForm?: boolean
}

type AuthContextInterface = {
    signIn: (UserData: UserInfo) => void;
    signOut: () => void;
    session?: UserInfo | null;
}


export const AuthContext = createContext<AuthContextInterface>({
    signIn: () => null,
    signOut: () => null,
    session: null
});


export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<UserInfo | null>(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData: UserInfo) =>  {
            console.log('in here man')
            console.log(userData);
            setSession(userData)
          },
        signOut: () => setSession(null),
        session,
      }}>
      {children}
    </AuthContext.Provider>
  );
}