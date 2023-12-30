import { axiosSocialApiClient } from '@Lib/axios';
import { IPet } from '@Models/pet';
import { CreatePetFormData } from '@Screens/CreatePet/forms/CreatePetForm';

export class PetService {
  public static readonly PETS_RESOURCE_ENDPOINT = '/pets';

  public static create(payload: CreatePetFormData) {
    return axiosSocialApiClient.post<IPet>(
      this.PETS_RESOURCE_ENDPOINT,
      payload,
    );
  }
}
