import { Comment } from "./comment"
import { Pet } from "./pet"

export interface Post {
  mediasUrls: string[]
  textContent: {
    full: string
    excerpt: string
  },
  numberOfLikes: number
  comments: Comment[]
  taggedPets: Pet[]
}
