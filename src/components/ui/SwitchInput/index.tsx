import { Switch, SwitchProps, Text, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './styles';

type SwitchInputPropsInput = {
  label: string;
  isEnabled: boolean;
  onValueChange: (value: boolean) => void;
};

type SwitchInputProps = Omit<
  SwitchInputPropsInput & SwitchProps,
  'value' | 'thumbColor' | 'trackColor'
>;

export function SwitchInput({
  label,
  isEnabled,
  onValueChange,
}: SwitchInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={isEnabled}
        onValueChange={onValueChange}
        style={styles.switch}
        trackColor={{
          true: colors.brand.blue300,
          false: 'gray',
        }}
        thumbColor={isEnabled ? colors.brand.blue800 : colors.brand.error}
      />
    </View>
  );
}
