import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
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
  inputRef?: React.Ref<TextInput>;
} & Omit<MaskInputProps, 'style' | 'cursorColor' | 'placeholderTextColor'>;

export function MaskedIconInput({
  error,
  iconProps,
  inputRef,
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
          ref={inputRef}
          {...rest}
        />
      </View>

      {errorMessage}
    </View>
  );
}
