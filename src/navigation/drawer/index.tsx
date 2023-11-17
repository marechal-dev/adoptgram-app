import Feather from '@expo/vector-icons/Feather';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TabRoutes } from '@Navigation/BottomTabs';
import { OptionsScreen } from '@Screens/Options';
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
        name="Options"
        options={{
          title: '',
          drawerLabel: 'Opções',
          drawerIcon: ({ color, size }) => (
            <Feather name="tool" color={color} size={size} />
          ),
        }}
        component={OptionsScreen}
      />
    </Drawer.Navigator>
  );
}
