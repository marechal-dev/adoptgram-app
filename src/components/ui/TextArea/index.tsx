import { TextInput, TextInputProps, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './styles';

type TextAreaProps = {} & TextInputProps;

export function TextArea(props: TextAreaProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
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
