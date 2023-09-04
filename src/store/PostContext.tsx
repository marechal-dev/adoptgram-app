import { Post } from "@Models/post"

import { createContext } from "react"

interface NewComment {
  postId: string
  commenterId: string
  content: string
}

type PostContextProps = {
  post: Post
}

export const PostContext = createContext<PostContextProps>(
  {} as PostContextProps,
)
