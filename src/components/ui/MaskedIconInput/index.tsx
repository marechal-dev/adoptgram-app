import Feather from '@expo/vector-icons/Feather';
import { Text, View } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { styles } from '@Components/core/brand/input-base-style';
import { colors } from '@Theme/colors';

type MaskedInputProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
  error?: string;
} & Omit<MaskInputProps, 'style' | 'cursorColor' | 'placeholderTextColor'>;

export function MaskedIconInput({
  error,
  iconProps,
  ...rest
}: MaskedInputProps) {
  const errorMessage = error ? (
    <Text style={styles.errorMessage}>{error}</Text>
  ) : null;

  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <Feather
          name={iconProps.iconName}
          size={iconProps.size}
          color={iconProps.color}
        />
        <MaskInput
          style={styles.input}
          cursorColor={colors.text.main}
          {...rest}
        />
      </View>

      {errorMessage}
    </View>
  );
}
