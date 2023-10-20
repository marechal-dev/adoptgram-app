import { TextInput, TextInputProps } from 'react-native';

import { colors } from '../../../../theme/colors';

import { styles } from './styles';

export type BrandInputInputProps = Omit<
  TextInputProps,
  'style' | 'cursorColor' | 'placeholderTextColor'
>;

export function Input(props: BrandInputInputProps) {
  return (
    <TextInput
      style={styles.input}
      cursorColor={colors.text.main}
      placeholderTextColor={colors.text.main}
      {...props}
    />
  );
}
