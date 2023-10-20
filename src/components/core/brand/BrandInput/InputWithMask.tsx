import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import { colors } from '../../../../theme/colors';

import { styles } from './styles';

export type BrandInputInputWithMaskProps = Omit<
  MaskInputProps,
  'style' | 'cursorColor' | 'placeholderTextColor'
>;

export function InputWithMask(props: BrandInputInputWithMaskProps) {
  return (
    <MaskInput
      style={styles.input}
      cursorColor={colors.text.main}
      placeholderTextColor={colors.text.main}
      {...props}
    />
  );
}
