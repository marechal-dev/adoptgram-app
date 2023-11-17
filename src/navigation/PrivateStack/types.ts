import { NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { DetailsStackParamList } from '@Navigation/DetailsStack/types';
import { DrawerParamList } from '@Navigation/Drawer/types';

export type PrivateStackParamList = {
  DrawerRoutes: NavigatorScreenParams<DrawerParamList>;
  DetailsStack: NavigatorScreenParams<DetailsStackParamList>;
};

export type PrivateStackNavigatorRoutes =
  NativeStackNavigationProp<PrivateStackParamList>;

export type DrawerRoutesProps = NativeStackScreenProps<
  PrivateStackParamList,
  'DrawerRoutes'
>;

export type DetailsStackProps = NativeStackScreenProps<
  PrivateStackParamList,
  'DetailsStack'
>;
