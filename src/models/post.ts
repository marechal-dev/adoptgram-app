import { IMedia } from './media';

export interface IPost {
  id: string;
  textContent: string;
  likes: number;
  medias: IMedia[];
  createdAt: Date;
}
