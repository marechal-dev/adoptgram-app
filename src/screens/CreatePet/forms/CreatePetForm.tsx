import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePickerAsset } from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@Components/ui/Button';
import { Input } from '@Components/ui/Input';
import { ProfilePictureImagePicker } from '@Components/ui/ProfilePictureImagePicker';
import { SelectInput } from '@Components/ui/SelectInput';
import { SwitchInput } from '@Components/ui/SwitchInput';
import { TextArea } from '@Components/ui/TextArea';
import { PetService } from '@Services/pet-service';
import { UploadService } from '@Services/upload-service';

import { NoPetProfilePictureSelected } from '../errors/no-pet-profile-picture-selected';
import { styles } from '../styles';

const NONNEGATIVE_INTEGER_REGEX = /[0-9]+/;

const createPetSchema = z.object({
  name: z.string().min(2, 'O nome do pet deve ter no mínimo 2 caracteres'),
  bio: z.string().min(15, 'Por favor, fale mais um pouco sobre o pet :)'),
  age: z.string().regex(NONNEGATIVE_INTEGER_REGEX, {
    message:
      'A idade precisa ser um número inteiro, positivo, maior ou igual a zero',
  }),
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

const petAgeSchema = z.number().int().nonnegative();

type CreatePetFormInputData = z.input<typeof createPetSchema>;
export type CreatePetFormData = Omit<
  z.output<typeof createPetSchema>,
  'age'
> & {
  profilePictureURL: string;
  age: number;
};

type SizeOption = 'Small' | 'Medium' | 'Big';
type SizeSelectItem = {
  label: string;
  value: SizeOption;
};

type EnergyLevelOption = 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
type EnergyLevelSelectItem = {
  label: string;
  value: EnergyLevelOption;
};

const sizeSelectItems: SizeSelectItem[] = [
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

const energySelectItems: EnergyLevelSelectItem[] = [
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
  const [profilePicture, setProfilePicture] = useState<ImagePickerAsset | null>(
    null,
  );
  const [uploadedProfilePictureURL, setUploadedProfilePictureURL] =
    useState('');

  const { control, handleSubmit, setFocus } = useForm<CreatePetFormInputData>({
    resolver: zodResolver(createPetSchema),
    defaultValues: {
      isCastrated: false,
      isVaccinated: false,
      requireMedicalAttention: false,
      size: 'Small',
      energyLevel: 'VeryLow',
    },
  });

  const focusNextOn = useMemo(
    () => ({
      bio: () => setFocus('bio'),
      age: () => setFocus('age'),
    }),
    [setFocus],
  );

  async function uploadPetProfilePicture() {
    if (!profilePicture) {
      throw new NoPetProfilePictureSelected();
    }

    const formData = new FormData();

    const file = {
      uri: profilePicture.uri,
      type: 'image/jpeg',
      name: profilePicture.fileName,
    };

    // See: https://github.com/facebook/react-native/blob/90faf0f254fef89eface8d30b72402359991c67b/Libraries/Network/FormData.js#L31-L50
    formData.append('image', file as any);

    const uploadResponse = await UploadService.uploadSingleFile(formData);

    if (uploadResponse.status === 200) {
      setUploadedProfilePictureURL(uploadResponse.data.imageURL);
    }
  }

  async function createPetProfile({
    name,
    age,
    bio,
    energyLevel,
    size,
    requireMedicalAttention,
    isCastrated,
    isVaccinated,
  }: CreatePetFormInputData) {
    try {
      await uploadPetProfilePicture();

      const petAge = petAgeSchema.parse(age);

      const payload: CreatePetFormData = {
        name,
        bio,
        energyLevel,
        size,
        requireMedicalAttention,
        isCastrated,
        isVaccinated,
        age: petAge,
        profilePictureURL: uploadedProfilePictureURL,
      };

      const response = await PetService.create(payload);

      if (response.status === 201) {
        Alert.alert('Sucesso!', 'Pet cadastrado com sucesso!');
      }
    } catch (error) {
      if (error instanceof NoPetProfilePictureSelected) {
        Alert.alert(
          'Erro ao realizar upload da foto de perfil do Pet',
          error.message,
        );
        return;
      }

      if (error instanceof Error) {
        Alert.alert('Erro ao cadastrar Pet', error.message);
      }
    }
  }

  function onFormSubmitError() {
    Alert.alert(
      'Erro',
      'Por favor, revise os campos do formulário e tente novamente',
    );
  }

  function onChangeProfilePicture(asset: ImagePickerAsset | null) {
    setProfilePicture(asset);
  }

  return (
    <View style={styles.formContainer}>
      <ProfilePictureImagePicker
        buttonLabel="Selecione a imagem de perfil do Pet :)"
        onChangeImage={onChangeProfilePicture}
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
            onSubmitEditing={focusNextOn.age}
            value={value}
            error={error?.message}
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
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
            placeholder="Idade do Pet (em anos)"
            inputRef={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            onSubmitEditing={focusNextOn.bio}
            value={value}
            error={error?.message}
            keyboardType="number-pad"
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
            returnKeyType="done"
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
          <SelectInput
            label="Tamanho"
            items={sizeSelectItems}
            currentValue={value}
            onChangeValue={onChange}
          />
        )}
      />

      <Controller
        name="energyLevel"
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Nível de Energia"
            items={energySelectItems}
            currentValue={value}
            onChangeValue={onChange}
          />
        )}
      />

      <Button
        onPressHandler={handleSubmit(createPetProfile, onFormSubmitError)}
      >
        Cadastrar
      </Button>
    </View>
  );
}
