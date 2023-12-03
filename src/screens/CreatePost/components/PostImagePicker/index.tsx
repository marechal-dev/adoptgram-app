import {
  ImagePickerOptions,
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { Button } from '@Components/ui/Button';
import { MediaCarousel } from '@Components/ui/Post/MediaCarousel';

import { styles } from './styles';

const IMAGE_PICKER_OPTIONS: ImagePickerOptions = {
  allowsEditing: false,
  allowsMultipleSelection: true,
  mediaTypes: MediaTypeOptions.Images,
  aspect: [16, 9],
  quality: 0.7,
};

interface IPostImagePickerProps {
  onPickImagesHandler: (uris: string[]) => void;
  onClearMedias: () => void;
}

export function PostImagePicker({
  onPickImagesHandler,
  onClearMedias,
}: IPostImagePickerProps) {
  const [pickedImages, setPickedImages] = useState<string[]>([]);

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

  async function onPickImages() {
    const permissionIsGranted = await verifyMediaLibraryPermissions();

    if (!permissionIsGranted) {
      return;
    }

    const { assets, canceled } =
      await launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);

    if (canceled) {
      return;
    }

    const photosUris = assets.map((asset) => asset.uri);

    setPickedImages((oldState) => [...photosUris, ...oldState]);
    onPickImagesHandler(photosUris);
  }

  function onClearImages() {
    setPickedImages([]);
    onClearMedias();
  }

  const hasPickedImages = pickedImages.length > 0;

  return (
    <View style={styles.root}>
      <View>
        {hasPickedImages ? (
          <MediaCarousel
            medias={pickedImages.map((image) => ({
              type: 'Photo',
              url: image,
            }))}
          />
        ) : (
          <Text style={styles.placeholderText}>
            Você ainda não selecionou nenhuma imagem
          </Text>
        )}
      </View>
      <View style={styles.actionContainer}>
        {hasPickedImages ? (
          <Button size="slim" onPressHandler={onClearImages}>
            Limpar
          </Button>
        ) : (
          <Button size="slim" onPressHandler={onPickImages}>
            Selecionar fotos
          </Button>
        )}
      </View>
    </View>
  );
}
