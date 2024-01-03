import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { DrawerRoutesProps } from '@Navigation/PrivateStack/types';
import { colors } from '@Theme/colors';

import { styles } from './styles';
import { IActionBarProps } from './types';

const ICONS_SIZE = 28;

export function ActionBar({ postID, initialLikeCount }: IActionBarProps) {
  const navigation = useNavigation<DrawerRoutesProps['navigation']>();

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

  function handleOnCommentButtonPress() {
    return navigation.navigate('DetailsStack', {
      screen: 'PostDetails',
      params: {
        id: postID,
      },
    });
  }

  return (
    <View style={styles.actionBarContainer}>
      <TouchableWithoutFeedback onPress={handleOnPressLikeButton}>
        <View style={styles.actionContainer}>
          <Feather
            name="thumbs-up"
            color={colors.brand.orange100}
            size={ICONS_SIZE}
          />
          <Text style={styles.textBase}>{likeCount} curtidas</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleOnCommentButtonPress}>
        <View style={styles.actionContainer}>
          <Feather
            name="message-circle"
            color={colors.brand.orange100}
            size={ICONS_SIZE}
          />
          <Text style={styles.textBase}>Comentar</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
