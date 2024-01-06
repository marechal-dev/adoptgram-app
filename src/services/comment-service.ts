import { axiosSocialApiClient } from '@Lib/axios';

export interface ICreateCommentRequest {
  postID: string;
  content: string;
}

export interface ICreateCommentResponse {
  comment: {
    id: string;
    postID: string;
    creatorID: string;
    content: string;
    createdAt: Date;
  };
}

export class CommentService {
  public static readonly RESOURCE_ENDPOINT = '/comments';

  public static create(payload: ICreateCommentRequest) {
    return axiosSocialApiClient.post<ICreateCommentResponse>(
      this.RESOURCE_ENDPOINT,
      payload,
    );
  }
}
