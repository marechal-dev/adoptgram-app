import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@Hooks/use-auth';
import { appTheme } from '@Theme/app-theme';

import { PrivateStackRoutes } from './PrivateStack';
import { PublicStackRoutes } from './PublicStack';

interface IAppNavigationProps {
  onReady: () => void;
}

export function AppRoutes({ onReady }: IAppNavigationProps) {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer onReady={onReady} theme={appTheme}>
      {!isAuthenticated ? <PublicStackRoutes /> : <PrivateStackRoutes />}
    </NavigationContainer>
  );
}
