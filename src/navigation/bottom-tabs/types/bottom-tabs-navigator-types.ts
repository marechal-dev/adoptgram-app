import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type BottomTabsParamList = {
  Timeline: undefined;
  SearchOrganizations: undefined;
  CreatePost: undefined;
  CreatePet: undefined;
  MyProfile: undefined;
};

export type BottomTabsRoutes = BottomTabNavigationProp<BottomTabsParamList>;
