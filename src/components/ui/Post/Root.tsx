import React, { ReactNode } from 'react';

import { PostContext } from '@Contexts/PostContext';
import { Post } from '@Models/post';

type PostRoot = {
  post: Post;
  children: ReactNode;
};

export function Root({ post, children }: PostRoot) {
  return (
    <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
  );
}
