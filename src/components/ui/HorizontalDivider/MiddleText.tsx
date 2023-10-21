import { ReactNode } from 'react';
import { Text } from 'react-native';

import { styles } from './styles';

export type MiddleTextProps = {
  children: ReactNode;
};

export function MiddleText({ children }: MiddleTextProps) {
  return <Text style={styles.textBetweenLines}>{children}</Text>;
}
