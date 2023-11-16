import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { colors } from '@Theme/colors';

import { styles } from './styles';
import { IActionBarProps } from './types';

const ICONS_SIZE = 28;

export function ActionBar({ postID, initialLikeCount }: IActionBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  function handleOnPressLikeButton() {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((oldState) => oldState - 1);

      return;
    }

    setIsLiked(true);
    setLikeCount((oldState) => oldState + 1);
  }

  return (
    <View style={styles.actionBarContainer}>
      <View style={styles.actionContainer}>
        <Feather
          name="thumbs-up"
          color={colors.brand.orange100}
          size={ICONS_SIZE}
          onPress={handleOnPressLikeButton}
        />
        <Text style={styles.textBase}>{likeCount} curtidas</Text>
      </View>
      <View style={styles.actionContainer}>
        <Feather
          name="message-circle"
          color={colors.brand.orange100}
          size={ICONS_SIZE}
        />
        <Text style={styles.textBase}>Comentar</Text>
      </View>
    </View>
  );
}
