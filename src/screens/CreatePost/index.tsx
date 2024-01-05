import { isAxiosError } from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';
import mime from 'mime';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { Button } from '@Components/ui/Button';
import { TextArea } from '@Components/ui/TextArea';
import { FileService } from '@Services/file-service';
import { ICreatePostRequest, PostService } from '@Services/post-service';
import { UploadService } from '@Services/upload-service';

import { PostImagePicker } from './components/PostImagePicker';
import { BulkUploadFailedError } from './errors/bulk-upload-failed';
import { styles } from './styles';

export function CreatePostScreen() {
  const [textContent, setTextContent] = useState('');
  const [medias, setMedias] = useState<ImagePickerAsset[]>([]);
  const [uploadedMediasUrls, setUploadedMediasUrls] = useState<string[]>([]);

  function onChangeTextContent(text: string) {
    setTextContent(text);
  }

  function onChangeMedias(pickedMedias: ImagePickerAsset[]) {
    setMedias((oldState) => [...pickedMedias, ...oldState]);
  }

  function onClearMedias() {
    setMedias([]);
  }

  async function uploadImages() {
    try {
      const formData = new FormData();

      medias.forEach((media) => {
        const uri = FileService.getURI(media.uri);
        const name = FileService.getFileName(media.uri);
        const type = mime.getType(media.uri);

        formData.append('files[]', {
          uri,
          name,
          type,
        } as any);
      });

      const uploadResult = await UploadService.bulkUploadFiles(formData);

      if (uploadResult.status === 201) {
        setUploadedMediasUrls(uploadResult.data.urls);
      }
    } catch (error) {
      throw new BulkUploadFailedError();
    }
  }

  async function onCreatePost() {
    try {
      const textContentIsValid = textContent.length > 0;

      if (!textContentIsValid) {
        Alert.alert('Aviso', 'O texto da postagem não pode estar vazio.');

        return;
      }

      if (textContent.length < 10) {
        Alert.alert(
          'Aviso',
          'O texto da postagem é muito curto, por favor, conte-nos mais :).',
        );

        return;
      }

      const haveSelectedMedias = medias.length > 0;

      if (!haveSelectedMedias) {
        Alert.alert('Aviso', 'Selecione ao menos uma imagem.');
      }

      await uploadImages();

      const mediasMetadatas = uploadedMediasUrls.map((url) => ({
        type: 'Image',
        url,
      }));

      const payload = {
        textContent,
        mediasMetadatas,
      } as ICreatePostRequest;

      const response = await PostService.create(payload);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Post criado com sucesso!');
      }
    } catch (error) {
      if (error instanceof BulkUploadFailedError) {
        Alert.alert('Erro', error.message);
      }

      if (isAxiosError(error)) {
        Alert.alert('Erro ao criar postagem', error.message);
      }
    }
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <Text style={styles.heading}>Criar Postagem</Text>

      <TextArea
        placeholder="Nos conte algo sobre sua nova postagem :)"
        onChangeText={onChangeTextContent}
        value={textContent}
      />

      <PostImagePicker
        onPickImagesHandler={onChangeMedias}
        onClearMedias={onClearMedias}
      />

      <View style={styles.actionContainer}>
        <Button onPressHandler={onCreatePost} size="slim">
          Criar
        </Button>
      </View>
    </ScrollView>
  );
}
