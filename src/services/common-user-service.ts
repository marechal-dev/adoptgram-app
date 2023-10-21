import axios, { AxiosInstance } from 'axios';

import { env } from '@Constants/env';
import { CreateCommonUserPayload } from '@Screens/SignIn/payloads/create-common-user-payload';

export class CommonUserService {
  private readonly axios: AxiosInstance;

  public readonly CREATE_ENDPOINT = '/common-users';

  public readonly FIND_BY_ID_ENDPOINT = '/common-users/:id';

  public constructor() {
    this.axios = axios.create({
      baseURL: env.EXPO_PUBLIC_SOCIAL_API_URL,
    });
  }

  public createOrganization(payload: CreateCommonUserPayload) {
    return this.axios.post(this.CREATE_ENDPOINT, payload);
  }

  public fetchOneById(id: string) {
    return this.axios.get(this.FIND_BY_ID_ENDPOINT.replace(':id', id));
  }
}
