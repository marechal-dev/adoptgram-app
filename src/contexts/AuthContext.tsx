import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useMemo, useState } from 'react';

type AuthContextProps = {
  authToken: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState('');

  function authenticate(token: string) {
    AsyncStorage.setItem('adoptgram:authToken', token);
    setAuthToken(token);
  }

  function logout() {
    AsyncStorage.removeItem('adoptgram:authToken');
    setAuthToken('');
  }

  const providerValue = useMemo(
    () => ({
      authToken,
      isAuthenticated: !!authToken,
      authenticate,
      logout,
    }),
    [authToken],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
