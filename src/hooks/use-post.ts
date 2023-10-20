import { useContext } from 'react';

import { PostContext } from '@Contexts/PostContext';

export function usePost() {
  return useContext(PostContext);
}
