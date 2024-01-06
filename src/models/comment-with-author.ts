import { ICommonUser } from './common-user';

export interface ICommentWithAuthor {
  id: string;
  postID: string;
  creator: ICommonUser;
  content: string;
  createdAt: Date;
}
