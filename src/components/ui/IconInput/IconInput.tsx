import Feather from '@expo/vector-icons/Feather';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from '@Components/core/brand/input-base-style';

type InputProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
  error?: string;
} & TextInputProps;

export function IconInput({ error, iconProps, ...rest }: InputProps) {
  return (
    <View style={styles.inputRoot}>
      <View style={styles.brandInputRoot}>
        <Feather
          name={iconProps.iconName}
          size={iconProps.size}
          color={iconProps.color}
        />
        <TextInput style={styles.input} {...rest} />
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
