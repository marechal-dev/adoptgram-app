import { IOrganization } from './organization';
import { IPost } from './post';

export type TimelinePost = IPost & {
  organization: IOrganization;
};
