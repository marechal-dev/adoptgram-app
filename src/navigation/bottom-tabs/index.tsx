import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MyProfileScreen } from '@Screens/MyProfile';
import { SearchOrganizationsScreen } from '@Screens/SearchOrganizations';
import { TimelineScreen } from '@Screens/Timeline';
import { colors } from '@Theme/colors';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        tabBarStyle: {
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarActiveTintColor: colors.brand.orange500,
        tabBarInactiveTintColor: colors.brand.orange100,
      }}
    >
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name="layers" color={color} size={size} />
          ),
          tabBarLabel: 'Timeline',
        }}
      />

      <Tab.Screen
        name="SearchOrganizations"
        component={SearchOrganizationsScreen}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
          tabBarLabel: 'Buscar',
        }}
      />

      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: 'Meu Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
