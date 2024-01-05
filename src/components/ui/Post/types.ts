export interface IMedia {
  url: string;
  type: 'Photo' | 'Video';
}

export interface IPostProps {
  id: string;
  creatorProfilePictureURL?: string | null;
  creatorUserName: string;
  medias: IMedia[];
  initialLikeCount: number;
  textContent: string;
  createdAt: Date | string;
}

export interface IMediaCarrouselProps {
  medias: IMedia[];
}

export interface IActionBarProps {
  postID: string;
  initialLikeCount: number;
}
