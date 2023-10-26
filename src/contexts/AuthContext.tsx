import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useMemo, useState } from 'react';

type AuthenticateParams = {
  token: string;
  userID: string;
};

type AuthContextProps = {
  authToken: string;
  currentUserID: string;
  isAuthenticated: boolean;
  authenticate: (params: AuthenticateParams) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUserID, setCurrentUserID] = useState('');
  const [authToken, setAuthToken] = useState('');

  function authenticate({ token, userID }: AuthenticateParams) {
    AsyncStorage.setItem('adoptgram:authToken', token);
    setAuthToken(token);
    setCurrentUserID(userID);
  }

  function logout() {
    AsyncStorage.removeItem('adoptgram:authToken');
    setAuthToken('');
    setCurrentUserID('');
  }

  const providerValue = useMemo(
    () => ({
      authToken,
      currentUserID,
      isAuthenticated: !!authToken,
      authenticate,
      logout,
    }),
    [authToken, currentUserID],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
