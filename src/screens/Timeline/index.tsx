import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';

import { LoadingOverlay } from '@Components/ui/LoadingOverlay';
import { Post } from '@Components/ui/Post';
import { Separator } from '@Components/ui/Post/Separator';
import { IPostProps } from '@Components/ui/Post/types';
import { SentryService } from '@Services/sentry-service';

import { styles } from './styles';

const posts: IPostProps[] = [
  {
    id: '1',
    creatorProfilePictureURL: 'https://source.unsplash.com/random/300x300',
    creatorUserName: 'lambeijos',
    initialLikeCount: 30,
    medias: [
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
    ],
    textContent:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi mollitia inventore impedit eaque nesciunt modi...',
    createdAt: new Date(2023, 1, 23),
  },
  {
    id: '2',
    creatorProfilePictureURL: 'https://source.unsplash.com/random/300x300',
    creatorUserName: 'lambeijos',
    initialLikeCount: 24,
    medias: [
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
    ],
    textContent:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi mollitia inventore impedit eaque nesciunt modi...',
    createdAt: new Date(2023, 3, 23),
  },
  {
    id: '3',
    creatorProfilePictureURL: 'https://source.unsplash.com/random/300x300',
    creatorUserName: 'lambeijos',
    initialLikeCount: 14,
    medias: [
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
      {
        url: 'https://source.unsplash.com/random/340x340',
        type: 'Photo',
      },
    ],
    textContent:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi mollitia inventore impedit eaque nesciunt modi...',
    createdAt: new Date(2023, 10, 15, 21, 50),
  },
];

export function TimelineScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const fetchTimeline = useCallback(async () => {
    setIsRequesting(true);

    setTimeout(() => {
      setIsRequesting(false);
    }, 3000);
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    fetchTimeline()
      .then(() => {
        setIsRefreshing(false);
      })
      .catch((error) => {
        setIsRefreshing(false);

        Alert.alert(
          'Alerta',
          'Não foi possível atualizar a linha do tempo. Por favor, verifique sua conexão com a internet e tente novamente.',
        );

        SentryService.captureException(error);
      });
  }, [fetchTimeline]);

  useEffect(() => {}, []);

  return (
    <View style={styles.pageContainer}>
      {isRequesting ? (
        <LoadingOverlay message="Aguente firme, o conteúdo está carregando!" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Post
              id={item.id}
              creatorUserName={item.creatorUserName}
              creatorProfilePictureURL={item.creatorProfilePictureURL}
              medias={item.medias}
              initialLikeCount={item.initialLikeCount}
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
