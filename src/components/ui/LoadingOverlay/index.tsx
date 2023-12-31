import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './styles';

type LoadingOverlayProps = {
  message: string;
};

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>{message}</Text>
      <ActivityIndicator size="large" color={colors.brand.blue800} />
    </View>
  );
}
