import { createContext } from 'react';

import { Post } from '@Models/post';

interface NewComment {
  postId: string;
  commenterId: string;
  content: string;
}

type PostContextProps = {
  post: Post;
};

export const PostContext = createContext<PostContextProps>(
  {} as PostContextProps,
);
