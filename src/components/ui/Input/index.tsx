import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from '@Components/core/brand/input-base-style';
import { colors } from '@Theme/colors';

type InputProps = {
  error?: string;
  inputRef?: React.LegacyRef<TextInput>;
} & TextInputProps;

export function Input({ error, inputRef, ...rest }: InputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          cursorColor={colors.text.main}
          {...rest}
        />
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
