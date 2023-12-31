import { ReactNode } from 'react';
import { View } from 'react-native';

import { HorizontalLine } from './HorizontalLine';
import { MiddleText } from './MiddleText';
import { styles } from './styles';

export type HorizontalTextDividerProps = {
  children: ReactNode;
};

export function HorizontalTextDivider({
  children,
}: HorizontalTextDividerProps) {
  return (
    <View style={styles.container}>
      <HorizontalLine />
      <MiddleText>{children}</MiddleText>
      <HorizontalLine />
    </View>
  );
}
