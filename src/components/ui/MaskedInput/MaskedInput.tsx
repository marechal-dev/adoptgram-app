import { Text, View } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { styles } from '@Components/core/brand/input-base-style';
import { colors } from '@Theme/colors';

type MaskedInputProps = {
  error?: string;
} & Omit<MaskInputProps, 'style' | 'cursorColor' | 'placeholderTextColor'>;

export function MaskedInput({ error, ...rest }: MaskedInputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <MaskInput
          style={styles.input}
          cursorColor={colors.text.main}
          placeholderTextColor={colors.text.main}
          {...rest}
        />
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
