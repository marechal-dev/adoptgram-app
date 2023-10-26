import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { StackRoutes } from './stack';

type IsFirstOpen = 'yes' | 'no' | null;
type DefaultRoute = 'Onboarding' | 'Login';

export function PublicRoutes() {
  const [defaultRoute, setDefaultRoute] = useState<DefaultRoute>('Onboarding');

  useEffect(() => {
    const defineDefaultRoute = async () => {
      const result = await AsyncStorage.getItem('adoptgram:IsFirstOpen');

      const castedResult = result as IsFirstOpen;

      const isFirstTime = !castedResult || castedResult === 'yes';

      if (isFirstTime) {
        await AsyncStorage.setItem('adoptgram:IsFirstOpen', 'no');
      }

      setDefaultRoute(isFirstTime ? 'Onboarding' : 'Login');
    };

    defineDefaultRoute();
  }, []);

  return <StackRoutes defaultRoute={defaultRoute} />;
}
