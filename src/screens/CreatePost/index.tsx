import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { Button } from '@Components/ui/Button';
import { TextArea } from '@Components/ui/TextArea';

import { PostImagePicker } from './components/PostImagePicker';
import { styles } from './styles';

export function CreatePostScreen() {
  const [textContent, setTextContent] = useState('');
  const [medias, setMedias] = useState<string[]>([]);

  function onChangeTextContent(text: string) {
    setTextContent(text);
  }

  function onChangeMedias(uris: string[]) {
    setMedias((oldState) => [...uris, ...oldState]);
  }

  function onClearMedias() {
    setMedias([]);
  }

  function onCreatePost() {
    const textContentIsValid = textContent.length > 0;

    if (!textContentIsValid) {
      Alert.alert('Aviso', 'O texto da postagem não pode estar vazio.');

      return;
    }

    const haveSelectedMedias = medias.length > 0;

    if (!haveSelectedMedias) {
      Alert.alert('Aviso', 'Selecione ao menos uma imagem.');
    }

    console.log(textContent, medias);
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
