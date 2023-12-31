export interface IMedia {
  url: string;
  type: 'Photo' | 'Video';
}

export interface IPostProps {
  id: string;
  creatorProfilePictureURL?: string;
  creatorUserName: string;
  medias: IMedia[];
  initialLikeCount: number;
  textContent: string;
  createdAt: Date;
}

export interface IMediaCarrouselProps {
  medias: IMedia[];
}

export interface IActionBarProps {
  postID: string;
  initialLikeCount: number;
}
