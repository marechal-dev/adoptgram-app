import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import PLACEHOLDER from '@Assets/images/placeholder-profile-picture.jpg';
import { DrawerRoutesProps } from '@Navigation/PrivateStack/types';
import { DateFormatService } from '@Services/date-format-service';

import { ActionBar } from './ActionBar';
import { MediaCarousel } from './MediaCarousel';
import { styles } from './styles';
import { IPostProps } from './types';

export function Post({
  id,
  creatorProfilePictureURL,
  creatorUserName,
  medias,
  initialLikeCount,
  textContent,
  createdAt,
}: IPostProps) {
  const navigation = useNavigation<DrawerRoutesProps['navigation']>();

  function handleOnUsernamePress() {
    navigation.navigate('DetailsStack', {
      screen: 'OrganizationProfile',
      params: {
        username: creatorUserName,
      },
    });
  }

  // function handleOnCommentButtonPress() {
  //   return navigation.navigate('DetailsStack', {
  //     screen: 'PostDetails',
  //     params: {
  //       id,
  //     },
  //   });
  // }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.pressableHeaderContainer}
          onPress={handleOnUsernamePress}
        >
          <Image
            style={styles.headerProfilePicture}
            source={creatorProfilePictureURL || PLACEHOLDER}
          />
          <View>
            <Text style={[styles.textBase, styles.headerUsername]}>
              {creatorUserName}
            </Text>
            <Text style={[styles.textBase, styles.headerPublishedAt]}>
              {DateFormatService.formatToRelativeDateTimeString(createdAt)}
            </Text>
          </View>
        </Pressable>
      </View>

      <MediaCarousel medias={medias} />

      <ActionBar postID={id} initialLikeCount={initialLikeCount} />

      <View style={styles.textContentContainer}>
        <Text style={[styles.textBase, styles.textContent]}>{textContent}</Text>
      </View>
    </View>
  );
}
