import { Image } from 'expo-image';
import {
  ImagePickerOptions,
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '../Button';

type ProfilePictureImagePickerProps = {
  buttonLabel: string;
  onChangeImageURI: (uri: string) => void;
};

const IMAGE_PICKER_OPTIONS: ImagePickerOptions = {
  allowsEditing: false,
  allowsMultipleSelection: false,
  mediaTypes: MediaTypeOptions.Images,
  aspect: [4, 3],
  quality: 0.6,
};

export function ProfilePictureImagePicker({
  buttonLabel,
  onChangeImageURI,
}: ProfilePictureImagePickerProps) {
  const [pickedImageURI, setPickedImageURI] = useState('');

  const [mediaLibraryPermissionStatus, requestPermission] =
    useMediaLibraryPermissions();

  async function verifyMediaLibraryPermissions() {
    if (
      !mediaLibraryPermissionStatus ||
      mediaLibraryPermissionStatus.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (mediaLibraryPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Aviso',
        'O AdoptGram precisa de acesso a galeria para seu funcionamento.',
      );

      return false;
    }

    return true;
  }

  async function onPickImage() {
    const permissionIsGranted = await verifyMediaLibraryPermissions();

    if (!permissionIsGranted) {
      return;
    }

    const { assets, canceled } =
      await launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);

    if (canceled) {
      return;
    }

    const pickedImage = assets[0].uri;

    setPickedImageURI(pickedImage);
    onChangeImageURI(pickedImage);
  }

  function onClearImage() {
    setPickedImageURI('');
    onChangeImageURI('');
  }

  const hasPickedImage = pickedImageURI !== '';

  return (
    <View>
      <View>
        {hasPickedImage ? (
          <Image source={pickedImageURI} />
        ) : (
          <Text>{buttonLabel}</Text>
        )}
      </View>
      <View>
        <Button onPressHandler={hasPickedImage ? onClearImage : onPickImage}>
          {hasPickedImage ? 'Limpar' : 'Selecionar Imagem de Perfil'}
        </Button>
      </View>
    </View>
  );
}
