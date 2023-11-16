import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@Hooks/use-auth';
import { appTheme } from '@Theme/app-theme';

import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

interface IAppNavigationProps {
  onReady: () => void;
}

export function AppNavigators({ onReady }: IAppNavigationProps) {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer onReady={onReady} theme={appTheme}>
      {isAuthenticated ? <PublicRoutes /> : <ProtectedRoutes />}
    </NavigationContainer>
  );
}
