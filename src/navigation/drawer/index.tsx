import Feather from '@expo/vector-icons/Feather';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TabRoutes } from '@Navigation/BottomTabs';
import { CreditsScreen } from '@Screens/Credits';
import { colors } from '@Theme/colors';

import { CustomDrawerContent } from './components/CustomDrawerContent';
import { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
        drawerInactiveTintColor: colors.brand.orange100,
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="TabRoutes"
        options={{
          title: '',
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
        component={TabRoutes}
      />

      <Drawer.Screen
        name="Credits"
        options={{
          title: '',
          drawerLabel: 'Créditos',
          drawerIcon: ({ color, size }) => (
            <Feather name="info" color={color} size={size} />
          ),
        }}
        component={CreditsScreen}
      />
    </Drawer.Navigator>
  );
}
