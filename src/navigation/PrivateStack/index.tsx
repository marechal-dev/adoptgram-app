import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailsStackRoutes } from '@Navigation/DetailsStack';
import { DrawerRoutes } from '@Navigation/Drawer';

import { PrivateStackParamList } from './types';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export function PrivateStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerRoutes"
        component={DrawerRoutes}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
        }}
      />

      <Stack.Screen
        name="DetailsStack"
        component={DetailsStackRoutes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
