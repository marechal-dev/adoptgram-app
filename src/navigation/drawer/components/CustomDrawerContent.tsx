import Feather from '@expo/vector-icons/Feather';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@Hooks/use-auth';
import { colors } from '@Theme/colors';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();

  const onLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja sair? Você precisará realizar login novamente.',
      [
        {
          text: 'Não',
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: logout,
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: 'light',
      },
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        activeTintColor={colors.brand.orange500}
        inactiveTintColor={colors.brand.orange100}
        icon={({ color, size }) => (
          <Feather name="log-out" color={color} size={size} />
        )}
        onPress={onLogout}
      />
    </DrawerContentScrollView>
  );
}
