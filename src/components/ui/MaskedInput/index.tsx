import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { styles } from '@Components/core/brand/input-base-style';
import { colors } from '@Theme/colors';

type MaskedInputProps = {
  error?: string;
  inputRef?: React.Ref<TextInput>;
} & Omit<MaskInputProps, 'style' | 'cursorColor' | 'placeholderTextColor'>;

export function MaskedInput({ error, inputRef, ...rest }: MaskedInputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <MaskInput
          style={styles.input}
          cursorColor={colors.text.main}
          ref={inputRef}
          {...rest}
        />
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
