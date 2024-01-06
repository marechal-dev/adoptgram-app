import { ICommentWithAuthor } from './comment-with-author';
import { IMedia } from './media';
import { IOrganization } from './organization';

export interface IPostDetails {
  id: string;
  textContent: string;
  likes: number;
  medias: IMedia[];
  comments: ICommentWithAuthor[];
  organization: IOrganization;
  createdAt: Date;
}
