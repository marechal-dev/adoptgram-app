import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { env } from '@Constants/env';

interface IAuthenticateClientRequest {
  email: string;
  password: string;
}

interface IAuthenticateClientResponse {
  accessToken: string;
}

export class AuthService {
  private readonly axios: AxiosInstance;

  private readonly COMMON_USERS_ENDPOINT = '/sessions/common-users';

  private readonly ORGANIZATIONS_ENDPOINT = '/sessions/organizations';

  public constructor() {
    this.axios = axios.create({
      baseURL: env.EXPO_PUBLIC_SOCIAL_API_URL,
    });
  }

  public authenticateCommonUser(requestPayload: IAuthenticateClientRequest) {
    return this.axios.post<
      IAuthenticateClientResponse,
      AxiosResponse<IAuthenticateClientResponse>,
      IAuthenticateClientRequest
    >(this.COMMON_USERS_ENDPOINT, requestPayload);
  }

  public authenticateOrganization(requestPayload: IAuthenticateClientRequest) {
    return this.axios.post<
      IAuthenticateClientResponse,
      AxiosResponse<IAuthenticateClientResponse>,
      IAuthenticateClientRequest
    >(this.ORGANIZATIONS_ENDPOINT, requestPayload);
  }
}
