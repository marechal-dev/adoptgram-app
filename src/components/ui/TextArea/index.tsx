import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './styles';

type TextAreaProps = {
  error?: string;
  inputRef?: React.LegacyRef<TextInput>;
} & TextInputProps;

export function TextArea(props: TextAreaProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          ref={props.inputRef}
          style={styles.input}
          multiline
          value={props.value}
          onChangeText={props.onChangeText}
          cursorColor={colors.text.main}
        />
      </View>
    </View>
  );
}
