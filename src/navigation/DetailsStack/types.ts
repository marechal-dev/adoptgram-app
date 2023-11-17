import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type DetailsStackParamList = {
  OrganizationProfile: {
    username: string;
  };
  PostDetails: {
    id: string;
  };
};

export type DetailsStackRoutes =
  NativeStackNavigationProp<DetailsStackParamList>;

export type OrganizationProfileScreenProps = NativeStackScreenProps<
  DetailsStackParamList,
  'OrganizationProfile'
>;
export type PostDetailsScreenProps = NativeStackScreenProps<
  DetailsStackParamList,
  'PostDetails'
>;
