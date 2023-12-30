import React from 'react';
import { Text, View } from 'react-native';
import PickerSelectInput, { Item } from 'react-native-picker-select';

import { styles } from './styles';

type SelectInputProps = {
  label: string;
  items: Item[];
  currentValue?: any;
  onChangeValue: (value: any) => void;
};

export function SelectInput({
  label,
  items,
  currentValue,
  onChangeValue,
}: SelectInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <PickerSelectInput
        onValueChange={onChangeValue}
        value={currentValue}
        items={items}
      />
    </View>
  );
}
