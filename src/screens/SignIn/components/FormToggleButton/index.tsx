import Feather from '@expo/vector-icons/Feather';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './style';

interface IFormToggleButtonProps {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  isSelected: boolean;
  onPressHandler: () => void;
}

export function FormToggleButton({
  icon,
  text,
  isSelected,
  onPressHandler,
}: IFormToggleButtonProps) {
  return (
    <Pressable style={styles.pressableContainer} onPress={onPressHandler}>
      <View
        style={[
          styles.roundedContainer,
          {
            backgroundColor: isSelected
              ? colors.brand.blue800
              : colors.brand.orange500,
            elevation: isSelected ? 0 : 10,
          },
        ]}
      >
        <Feather
          name={icon}
          size={38}
          color={isSelected ? colors.brand.orange500 : colors.brand.blue800}
        />
      </View>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}
