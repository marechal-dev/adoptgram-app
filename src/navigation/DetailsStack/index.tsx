import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OrganizationProfileScreen } from '@Screens/OrganizationProfile';
import { PostDetailsScreen } from '@Screens/PostDetails';

import { DetailsStackParamList } from './types';

const Stack = createNativeStackNavigator<DetailsStackParamList>();

export function DetailsStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrganizationProfile"
        component={OrganizationProfileScreen}
        options={{
          headerShadowVisible: false,
          headerBackTitle: 'Voltar',
          headerBackButtonMenuEnabled: false,
        }}
      />

      <Stack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitle: 'Voltar',
          headerBackButtonMenuEnabled: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
}
