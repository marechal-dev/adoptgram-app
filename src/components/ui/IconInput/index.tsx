import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './styles';

type InputProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
  error?: string;
  inputRef?: React.LegacyRef<TextInput>;
} & TextInputProps;

export function IconInput({ error, iconProps, inputRef, ...rest }: InputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.iconInputContainer}>
        <Feather
          name={iconProps.iconName}
          size={iconProps.size}
          color={iconProps.color}
        />
        <TextInput
          style={styles.input}
          cursorColor={colors.text.main}
          ref={inputRef}
          {...rest}
        />
      </View>

      {error ? (
        <Text style={styles.errorMessage}>{error}</Text>
      ) : (
        <Text style={styles.errorMessage} />
      )}
    </View>
  );
}
