import { IComment } from './comment';
import { IMedia } from './media';

export interface IPostDetails {
  id: string;
  creatorProfilePictureURL?: string;
  creatorUsername: string;
  textContent: string;
  likes: number;
  medias: IMedia[];
  comments: IComment[];
  createdAt: Date;
}
