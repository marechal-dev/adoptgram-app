import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface IBrandInputRootProps {
  error?: string;
  children: ReactNode;
}

export function Root({ error, children }: IBrandInputRootProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>{children}</View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
