import { Text, View } from 'react-native';

import { MyProfileScreenProps } from '@Navigation/BottomTabs/types';

import { styles } from './styles';

export function MyProfileScreen({ route }: MyProfileScreenProps) {
  return (
    <View style={styles.screenContainer}>
      <Text>{route.params.id}</Text>
    </View>
  );
}
