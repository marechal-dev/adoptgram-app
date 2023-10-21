import React from 'react';
import { Text, View } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { styles } from '@Components/core/brand/input-base-style';
import { colors } from '@Theme/colors';

type MaskedInputProps = {
  error?: string;
  inputRef?: React.LegacyRef<typeof MaskInput>;
} & Omit<MaskInputProps, 'style' | 'cursorColor' | 'placeholderTextColor'>;

export function MaskedInput({ error, ...rest }: MaskedInputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <MaskInput
          style={styles.input}
          cursorColor={colors.text.main}
          {...rest}
        />
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
