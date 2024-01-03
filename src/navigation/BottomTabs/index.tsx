import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '@Hooks/use-auth';
import { CreatePetScreen } from '@Screens/CreatePet';
import { CreatePostScreen } from '@Screens/CreatePost';
import { SearchOrganizationsScreen } from '@Screens/SearchOrganizations';
import { TimelineScreen } from '@Screens/Timeline';
import { colors } from '@Theme/colors';

import { BottomTabsParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export function TabRoutes() {
  const { role } = useAuth();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
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
          tabBarLabel: 'Linha do Tempo',
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

      {role === 'Organization' ? (
        <>
          <Tab.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{
              title: '',
              tabBarLabel: 'Criar Post',
              tabBarIcon: ({ color, size }) => (
                <Feather name="share" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="CreatePet"
            component={CreatePetScreen}
            options={{
              title: '',
              tabBarLabel: 'Adicionar Pet',
              tabBarIcon: ({ color, size }) => (
                <Feather name="plus-circle" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : null}

      {/* <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: 'Meu Perfil',
        }}
        initialParams={{
          id: currentUserID,
        }}
      /> */}
    </Tab.Navigator>
  );
}
