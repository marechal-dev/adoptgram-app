import { axiosSocialApiClient } from '@Lib/axios';
import { CreateCommonUserPayload } from '@Screens/SignIn/payloads/create-common-user-payload';
import { RegisterCommonUserFormData } from '@Screens/SignIn/schemas/register-common-user-schema';

export class CommonUserService {
  public static CREATE_ENDPOINT = '/common-users';

  public static FIND_BY_ID_ENDPOINT = '/common-users/:id';

  public static create(data: RegisterCommonUserFormData) {
    const payload = this.mapCreateDataToCreatePayload(data);

    return axiosSocialApiClient.post(this.CREATE_ENDPOINT, payload);
  }

  private static mapCreateDataToCreatePayload(
    data: RegisterCommonUserFormData,
  ): CreateCommonUserPayload {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      cpf: data.cpf,
    };
  }

  public static fetchOneById(id: string) {
    return axiosSocialApiClient.get(
      this.FIND_BY_ID_ENDPOINT.replace(':id', id),
    );
  }
}
