import { Image } from 'expo-image';
import { Text, View } from 'react-native';

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
  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerProfilePicture}
          source={creatorProfilePictureURL}
        />
        <View>
          <Text style={[styles.textBase, styles.headerUsername]}>
            {creatorUserName}
          </Text>
          <Text style={[styles.textBase, styles.headerPublishedAt]}>
            {DateFormatService.formatToRelativeDateTimeString(createdAt)}
          </Text>
        </View>
      </View>

      <MediaCarousel medias={medias} />

      <ActionBar postID={id} initialLikeCount={initialLikeCount} />

      <View style={styles.textContentContainer}>
        <Text style={[styles.textBase, styles.textContent]}>{textContent}</Text>
      </View>
    </View>
  );
}
