import React from 'react';
import { FlatList, Text, View } from 'react-native';

import PLACEHOLDER from '@Assets/images/placeholder-profile-picture.jpg';
import { Comment } from '@Components/ui/Comment';
import { IconButton } from '@Components/ui/IconButton';
import { Input } from '@Components/ui/Input';
import { Post } from '@Components/ui/Post';
import { HorizontalSeparator } from '@Components/ui/Separator';
import { useAuth } from '@Hooks/use-auth';
import { IPostDetails } from '@Models/post-details';
import { PostDetailsScreenProps } from '@Navigation/DetailsStack/types';

import { styles } from './styles';

const MOCK_DATA: IPostDetails = {
  id: '1',
  creatorProfilePictureURL: 'https://source.unsplash.com/random/300x300',
  creatorUsername: 'lambeijos',
  likes: 245,
  textContent: 'Olha só que gatinho lindo',
  medias: [
    {
      id: '1',
      type: 'Photo',
      url: 'https://source.unsplash.com/random/300x300',
    },
    {
      id: '1',
      type: 'Photo',
      url: 'https://source.unsplash.com/random/300x300',
    },
  ],
  comments: [
    {
      id: '1',
      commenterUsername: 'teste',
      content: 'Teste teste',
    },
    // {
    //   id: '2',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
    // {
    //   id: '3',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
    // {
    //   id: '4',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
    // {
    //   id: '5',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
    // {
    //   id: '6',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
    // {
    //   id: '7',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
    // {
    //   id: '8',
    //   commenterUsername: 'teste1',
    //   content: 'Teste teste',
    // },
  ],
  createdAt: new Date(),
};

export function PostDetailsScreen({ route }: PostDetailsScreenProps) {
  const { role } = useAuth();

  const currentUserIsOrganization = role === 'Organization';

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA.comments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Post
              id={route.params.id}
              creatorProfilePictureURL={
                MOCK_DATA.creatorProfilePictureURL || PLACEHOLDER
              }
              creatorUserName={MOCK_DATA.creatorUsername}
              textContent={MOCK_DATA.textContent}
              initialLikeCount={MOCK_DATA.likes}
              createdAt={MOCK_DATA.createdAt}
              medias={MOCK_DATA.medias}
            />

            <Text style={[styles.baseText, styles.heading]}>Comentários</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={[styles.baseText, styles.emptyText]}>
            Ainda não existem comentários nessa postagem. Faça o primeiro
            comentário 😁
          </Text>
        }
        ItemSeparatorComponent={() => <HorizontalSeparator size={6} />}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <Comment
            profilePicture={item.commenterProfilePictureURL}
            username={item.commenterUsername}
            content={item.content}
          />
        )}
        ListFooterComponentStyle={styles.footerContainer}
        ListFooterComponent={() =>
          currentUserIsOrganization ? null : (
            <View style={styles.inputContainer}>
              <Input placeholder="Comentar" />
              <IconButton
                iconProps={{
                  iconName: 'send',
                  color: 'white',
                  size: 24,
                }}
              />
            </View>
          )
        }
        nestedScrollEnabled
      />
    </View>
  );
}
