import { axiosSocialApiClient } from '@Lib/axios';
import { IPostDetails } from '@Models/post-details';
import { TimelinePost } from '@Models/timeline-post';

export type MediaMetadata = {
  type: 'Image' | 'Video';
  url: string;
};

export interface ICreatePostRequest {
  textContent: string;
  mediasMetadatas: MediaMetadata[];
}

export interface ICreatePostResponse {
  id: string;
  textContent: string;
  createdAt: Date;
  likes: number;
}

export interface IFetchTimelineResponse {
  timelinePosts: TimelinePost[];
}

export interface IFetchDetailsByIdResponse {
  post: IPostDetails;
}

export class PostService {
  public static RESOURCE_ENDPOINT = '/posts';
  public static TIMELINE_ENDPOINT = '/posts/timeline';
  public static DETAILS_ENDPOINT = '/posts/:id/details';

  public static create(payload: ICreatePostRequest) {
    return axiosSocialApiClient.post<ICreatePostResponse>(
      this.RESOURCE_ENDPOINT,
      payload,
    );
  }

  public static fetchTimeline() {
    return axiosSocialApiClient.get<IFetchTimelineResponse>(
      this.TIMELINE_ENDPOINT,
    );
  }

  public static fetchDetailsByID(id: string) {
    return axiosSocialApiClient.get<IFetchDetailsByIdResponse>(
      this.DETAILS_ENDPOINT.replace(':id', id),
    );
  }
}
