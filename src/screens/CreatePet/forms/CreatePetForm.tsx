import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import PickerSelectInput from 'react-native-picker-select';
import { z } from 'zod';

import { Input } from '@Components/ui/Input';
import { ProfilePictureImagePicker } from '@Components/ui/ProfilePictureImagePicker';
import { SwitchInput } from '@Components/ui/SwitchInput';
import { TextArea } from '@Components/ui/TextArea';
import { UploadService } from '@Services/upload-service';

import { styles } from '../styles';

const createPetSchema = z.object({
  name: z.string().min(2, 'O nome do pet deve ter no mínimo 2 caracteres'),
  bio: z.string().min(15, 'Por favor, fale mais um pouco sobre o pet :)'),
  age: z
    .string()
    .transform((value) => Number(value))
    .pipe(
      z
        .number({
          required_error: 'A idade é obrigatória',
          invalid_type_error: 'Por favor, digite um número válido',
        })
        .int({
          message: 'Não insira números quebrados',
        })
        .positive({
          message: 'A idade do Pet tem que ser positiva',
        })
        .min(0, 'A idade tem que ser no mínimo zero'),
    ),
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

type CreatePetFormInputData = z.input<typeof createPetSchema>;
type CreatePetFormOutputData = z.output<typeof createPetSchema>;

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

export function CreatePetForm() {
  const [profilePictureURI, setProfilePictureURI] = useState('');
  const [uploadedProfilePictureURL, setUploadedProfilePictureURL] =
    useState('');

  const { control, handleSubmit } = useForm<CreatePetFormInputData>({
    resolver: zodResolver(createPetSchema),
  });

  async function submitPetProfilePicture() {
    try {
      const formData = new FormData();

      const uploadResponse = await UploadService.uploadSingleFile(formData);

      if (uploadResponse.status === 200) {
        setUploadedProfilePictureURL(uploadResponse.data.imageURL);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao enviar a imagem de perfil do Pet', error.message);
      }
    }
  }

  async function createPetProfile() {}

  function onChangeProfilePictureURI(uri: string) {
    setProfilePictureURI(uri);
  }

  return (
    <View style={styles.formContainer}>
      <ProfilePictureImagePicker
        buttonLabel="Seleciona a imagem de perfil do Pet :)"
        onChangeImageURI={onChangeProfilePictureURI}
      />

      <Controller
        name="name"
        control={control}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Nome do Pet"
            inputRef={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
          />
        )}
      />

      <Controller
        name="bio"
        control={control}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <TextArea
            placeholder="Bio do Pet: Conte um pouco sobre ele!"
            inputRef={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
            keyboardType="default"
            autoCapitalize="sentences"
          />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Idade do Pet"
            inputRef={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
          />
        )}
      />

      <View style={styles.switchsContainer}>
        <Controller
          name="isCastrated"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SwitchInput
              label="É castrado?"
              isEnabled={value}
              onValueChange={onChange}
            />
          )}
        />
        <Controller
          name="isVaccinated"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SwitchInput
              label="É vacinado?"
              isEnabled={value}
              onValueChange={onChange}
            />
          )}
        />
      </View>
      <View style={styles.singleSwitchContainer}>
        <Controller
          name="requireMedicalAttention"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SwitchInput
              label="Precisa de atenção médica?"
              isEnabled={value}
              onValueChange={onChange}
            />
          )}
        />
      </View>

      <Controller
        name="size"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PickerSelectInput
            onValueChange={onChange}
            value={value}
            items={sizeSelectItems}
          />
        )}
      />

      <Controller
        name="energyLevel"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PickerSelectInput
            onValueChange={onChange}
            value={value}
            items={energySelectItems}
          />
        )}
      />
    </View>
  );
}
