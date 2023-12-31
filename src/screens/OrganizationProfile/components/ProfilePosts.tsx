import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text } from 'react-native';

import { ListItemSeparator } from '@Components/ui/ListItemSeparator';
import { PostPreview } from '@Components/ui/PostPreview';
import { IPost } from '@Models/post';
import { DrawerRoutesProps } from '@Navigation/PrivateStack/types';

import { profilePostsStyles } from './styles';

type ProfilePostsProps = {
  posts: IPost[];
};

export function ProfilePosts({ posts }: ProfilePostsProps) {
  const { navigate } = useNavigation<DrawerRoutesProps['navigation']>();

  const organizationHavePublishedPosts = posts.length > 0;

  return (
    <>
      <Text style={profilePostsStyles.title}>Posts</Text>

      {organizationHavePublishedPosts ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          renderItem={({ item }) => (
            <PostPreview
              firstMediaURL={item.medias[0].url}
              onPress={() =>
                navigate('DetailsStack', {
                  screen: 'PostDetails',
                  params: {
                    id: item.id,
                  },
                })
              }
            />
          )}
          numColumns={3}
          ItemSeparatorComponent={() => (
            <ListItemSeparator size={16} horizontal />
          )}
        />
      ) : (
        <Text>Essa ONG ainda não tem nenhuma publicação!</Text>
      )}
    </>
  );
}
