import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useMemo, useState } from 'react';

type UserRole = 'CommonUser' | 'Organization' | '';

type AuthenticateParams = {
  token: string;
  userID: string;
  userRole: UserRole;
};

type AuthContextProps = {
  authToken: string;
  currentUserID: string;
  isAuthenticated: boolean;
  role: UserRole;
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
  const [role, setRole] = useState<UserRole>('Organization');

  function authenticate({ token, userID, userRole }: AuthenticateParams) {
    AsyncStorage.setItem('adoptgram:authToken', token);
    setRole(userRole);
    setAuthToken(token);
    setCurrentUserID(userID);
  }

  function logout() {
    AsyncStorage.removeItem('adoptgram:authToken');
    setAuthToken('');
    setCurrentUserID('');
    setRole('');
  }

  const providerValue = useMemo(
    () => ({
      authToken,
      currentUserID,
      role,
      isAuthenticated: !!authToken,
      authenticate,
      logout,
    }),
    [authToken, currentUserID, role],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
