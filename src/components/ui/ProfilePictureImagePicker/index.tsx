import { Image } from 'expo-image';
import {
  ImagePickerAsset,
  ImagePickerOptions,
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '../Button';

import { styles } from './styles';

type ProfilePictureImagePickerProps = {
  buttonLabel: string;
  onChangeImage: (asset: ImagePickerAsset | null) => void;
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
  onChangeImage,
}: ProfilePictureImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset | null>(null);

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

    const asset = assets[0];

    setPickedImage(asset);
    onChangeImage(asset);
  }

  function onClearImage() {
    setPickedImage(null);
    onChangeImage(null);
  }

  const hasPickedImage = pickedImage !== null;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {hasPickedImage ? (
          <Image source={pickedImage.uri} style={styles.image} />
        ) : (
          <Text style={styles.label}>{buttonLabel}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPressHandler={hasPickedImage ? onClearImage : onPickImage}>
          {hasPickedImage ? 'Limpar' : 'Selecionar Imagem de Perfil'}
        </Button>
      </View>
    </View>
  );
}
