import { useState } from 'react';
import { View } from 'react-native';
import PickerSelectInput from 'react-native-picker-select';
import { z } from 'zod';

import { Input } from '@Components/ui/Input';
import { SwitchInput } from '@Components/ui/SwitchInput';
import { TextArea } from '@Components/ui/TextArea';

import { styles } from '../styles';

const createPetSchema = z.object({
  name: z.string().min(2, 'O nome do pet deve ter no mínimo 2 caracteres'),
  bio: z.string().min(15, 'Por favor, fale mais um pouco sobre o pet :)'),
  age: z.coerce
    .number({
      invalid_type_error: 'Por favor, digite um número válido',
      required_error: 'A idade é obrigatória',
    })
    .min(0, 'A idade do pet não pode ser negativa'),
  isCastrated: z.boolean(),
  requireMedicalAttention: z.boolean(),
  isVaccinated: z.boolean(),
  size: z.enum(['Small', 'Medium', 'Big'] as const),
  energyLevel: z.enum([
    'VeryLow',
    'Low',
    'Medium',
    'High',
    'VeryHigh',
  ] as const),
});

const sizeSelectItems = [
  {
    label: 'Pequeno Porte',
    value: 'Small',
  },
  {
    label: 'Médio Porte',
    value: 'Medium',
  },
  {
    label: 'Grande Porte',
    value: 'Big',
  },
];

const energySelectItems = [
  {
    label: 'Muito Quieto',
    value: 'VeryLow',
  },
  {
    label: 'Quietinho',
    value: 'Low',
  },
  {
    label: 'Tranquilo',
    value: 'Medium',
  },
  {
    label: 'Agitado',
    value: 'High',
  },
  {
    label: 'Muito Agitado',
    value: 'VeryHigh',
  },
];

type SizeOption = 'Small' | 'Medium' | 'High';
type EnergyLevelOption = 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';

export function CreatePetForm() {
  const [isCastrated, setIsCastrated] = useState(false);
  const [requireMedicalAttention, setRequireMedicalAttention] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [size, setSize] = useState<SizeOption>('Small');
  const [energyLevel, setEnergyLevel] = useState<EnergyLevelOption>('VeryLow');

  function onChangeIsCastratedValue(value: boolean) {
    setIsCastrated(value);
  }

  function onChangeRequireMedicalAttentionValue(value: boolean) {
    setRequireMedicalAttention(value);
  }

  function onChangeIsVaccinated(value: boolean) {
    setIsVaccinated(value);
  }

  function onChangeSizeValue(value: SizeOption) {
    setSize(value);
  }

  function onChangeEnergyLevelValue(value: EnergyLevelOption) {
    setEnergyLevel(value);
  }

  return (
    <View style={styles.formContainer}>
      <Input placeholder="Nome do Pet" />

      <TextArea placeholder="Bio do Pet: Conte um pouco sobre ele!" />

      <Input placeholder="Idade do Pet" />

      <View style={styles.switchsContainer}>
        <SwitchInput
          label="É castrado?"
          isEnabled={isCastrated}
          onValueChange={onChangeIsCastratedValue}
        />
        <SwitchInput
          label="É vacinado?"
          isEnabled={isVaccinated}
          onValueChange={onChangeIsVaccinated}
        />
      </View>
      <View style={styles.singleSwitchContainer}>
        <SwitchInput
          label="Precisa de atenção médica?"
          isEnabled={requireMedicalAttention}
          onValueChange={onChangeRequireMedicalAttentionValue}
        />
      </View>

      <PickerSelectInput
        onValueChange={onChangeSizeValue}
        value={size}
        items={sizeSelectItems}
      />
      <PickerSelectInput
        onValueChange={onChangeEnergyLevelValue}
        value={energyLevel}
        items={energySelectItems}
      />
    </View>
  );
}
