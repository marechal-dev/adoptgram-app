import { AxiosResponse } from 'axios';

import { axiosSocialApiClient } from '@Lib/axios';

interface IAuthenticateClientRequest {
  email: string;
  password: string;
}

interface IAuthenticateClientResponse {
  userID: string;
  accessToken: string;
}

export class AuthService {
  public static COMMON_USERS_ENDPOINT = '/sessions/common-users';

  public static ORGANIZATIONS_ENDPOINT = '/sessions/organizations';

  public static authenticateCommonUser(
    requestPayload: IAuthenticateClientRequest,
  ) {
    return axiosSocialApiClient.post<
      IAuthenticateClientResponse,
      AxiosResponse<IAuthenticateClientResponse>,
      IAuthenticateClientRequest
    >(this.COMMON_USERS_ENDPOINT, requestPayload);
  }

  public static authenticateOrganization(
    requestPayload: IAuthenticateClientRequest,
  ) {
    return axiosSocialApiClient.post<
      IAuthenticateClientResponse,
      AxiosResponse<IAuthenticateClientResponse>,
      IAuthenticateClientRequest
    >(this.ORGANIZATIONS_ENDPOINT, requestPayload);
  }
}
