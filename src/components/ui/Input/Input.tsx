import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from '@Components/core/brand/input-base-style';

type InputProps = {
  error?: string;
} & TextInputProps;

export function Input({ error, ...rest }: InputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <TextInput style={styles.input} {...rest} />
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
