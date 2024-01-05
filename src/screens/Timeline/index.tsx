import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';

import { LoadingOverlay } from '@Components/ui/LoadingOverlay';
import { Post } from '@Components/ui/Post';
import { Separator } from '@Components/ui/Post/Separator';
import { TimelinePost } from '@Models/timeline-post';
import { PostService } from '@Services/post-service';
import { SentryService } from '@Services/sentry-service';

import { styles } from './styles';

export function TimelineScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [timelinePosts, setTimelinePosts] = useState<TimelinePost[]>([]);

  const fetchTimeline = useCallback(async () => {
    setIsRequesting(true);

    try {
      const response = await PostService.fetchTimeline();

      if (response.status === 200) {
        setTimelinePosts(() => response.data.timelinePosts);
      }
    } catch (error) {
      SentryService.captureException(error);
    }

    setIsRequesting(false);
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await fetchTimeline();
    } catch (error) {
      Alert.alert(
        'Alerta',
        'Não foi possível atualizar a linha do tempo. Por favor, verifique sua conexão com a internet e tente novamente.',
      );
    }

    setIsRefreshing(false);
  }, [fetchTimeline]);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  return (
    <View style={styles.pageContainer}>
      {isRequesting || isRefreshing ? (
        <LoadingOverlay message="Aguente firme, o conteúdo está carregando!" />
      ) : (
        <FlatList
          data={timelinePosts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Post
              id={item.id}
              creatorUserName={item.organization.username}
              creatorProfilePictureURL={item.organization.profilePictureURL}
              medias={item.medias}
              initialLikeCount={item.likes}
              textContent={item.textContent}
              createdAt={item.createdAt}
            />
          )}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
}
