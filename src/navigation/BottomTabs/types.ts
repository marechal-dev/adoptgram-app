import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

export type BottomTabsParamList = {
  Timeline: undefined;
  SearchOrganizations: undefined;
  CreatePost: undefined;
  CreatePet: undefined;
  MyProfile: {
    id: string;
  };
};

export type BottomTabsRoutes = BottomTabNavigationProp<BottomTabsParamList>;

export type TimelineScreenProps = BottomTabScreenProps<
  BottomTabsParamList,
  'Timeline'
>;
export type SearchOrganizationsScreenProps = BottomTabScreenProps<
  BottomTabsParamList,
  'SearchOrganizations'
>;
export type CreatePostScreenProps = BottomTabScreenProps<
  BottomTabsParamList,
  'CreatePost'
>;
export type CreatePetScreenProps = BottomTabScreenProps<
  BottomTabsParamList,
  'CreatePet'
>;
export type MyProfileScreenProps = BottomTabScreenProps<
  BottomTabsParamList,
  'MyProfile'
>;
