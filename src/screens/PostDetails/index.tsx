import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

import PLACEHOLDER from '@Assets/images/placeholder-profile-picture.jpg';
import { Comment } from '@Components/ui/Comment';
import { IconButton } from '@Components/ui/IconButton';
import { Input } from '@Components/ui/Input';
import { LoadingOverlay } from '@Components/ui/LoadingOverlay';
import { Post } from '@Components/ui/Post';
import { HorizontalSeparator } from '@Components/ui/Separator';
import { useAuth } from '@Hooks/use-auth';
import { ICommentWithAuthor } from '@Models/comment-with-author';
import { IPostDetails } from '@Models/post-details';
import { PostDetailsScreenProps } from '@Navigation/DetailsStack/types';
import {
  CommentService,
  ICreateCommentRequest,
} from '@Services/comment-service';
import { PostService } from '@Services/post-service';

import { styles } from './styles';

export function PostDetailsScreen({
  route,
  navigation,
}: PostDetailsScreenProps) {
  const { role } = useAuth();

  const [isRequesting, setIsRequesting] = useState(true);
  const [postDetails, setPostDetails] = useState<IPostDetails>(
    {} as IPostDetails,
  );
  const [comments, setComments] = useState<ICommentWithAuthor[]>([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setIsRequesting(true);

      try {
        const response = await PostService.fetchDetailsByID(route.params.id);

        if (response.status === 200) {
          setPostDetails(response.data.post);
          setComments(response.data.post.comments);
        }
      } catch (error) {
        navigation.goBack();

        Alert.alert(
          'Erro',
          'Não foi possível carregar a publicação selecionada. Tente novamente mais tarde!',
        );
      }
      setIsRequesting(false);
    };

    fetchDetails();
  }, []);

  function onChangeCommentText(value: string) {
    setCommentText(value);
  }

  async function onComment() {
    if (!commentText) {
      return;
    }

    const payload: ICreateCommentRequest = {
      content: commentText,
      postID: postDetails.id,
    };

    try {
      const response = await CommentService.create(payload);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Comentário cadastrado com sucesso!');

        const { comment } = response.data;

        setComments((oldState) => [
          {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            postID: route.params.id,
            creator: {
              id: comment.id,
              name: 'Você',
              email: 'HIDDEN',
              createdAt: new Date(),
            },
          },
          ...oldState,
        ]);
        setCommentText('');
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar seu comentário. Por favor, tente novamente mais tarde.',
      );
    }
  }

  const currentUserIsOrganization = role === 'Organization';

  return isRequesting ? (
    <LoadingOverlay message="Carregando publicação..." />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Post
              id={route.params.id}
              creatorProfilePictureURL={
                postDetails.organization.profilePictureURL || PLACEHOLDER
              }
              creatorUserName={postDetails.organization.username}
              textContent={postDetails.textContent}
              initialLikeCount={postDetails.likes}
              createdAt={postDetails.createdAt}
              medias={postDetails.medias}
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
            profilePicture={item.creator.profilePictureURL || PLACEHOLDER}
            username={item.creator.name}
            content={item.content}
          />
        )}
        nestedScrollEnabled
      />
      {currentUserIsOrganization ? null : (
        <View style={styles.footerContainer}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Comentar"
              value={commentText}
              onChangeText={onChangeCommentText}
            />
            <IconButton
              iconProps={{
                iconName: 'send',
                color: 'white',
                size: 24,
              }}
              onPress={onComment}
            />
          </View>
        </View>
      )}
    </View>
  );
}
