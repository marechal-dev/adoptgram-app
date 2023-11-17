import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';

import { BottomTabsParamList } from '@Navigation/BottomTabs/types';

export type DrawerParamList = {
  TabRoutes: NavigatorScreenParams<BottomTabsParamList>;
  Options: undefined;
};

export type DrawerRoutes = DrawerNavigationProp<DrawerParamList>;

export type TabRoutesProps = DrawerScreenProps<DrawerParamList, 'TabRoutes'>;
export type OptionsScreenProps = DrawerScreenProps<DrawerParamList, 'Options'>;
