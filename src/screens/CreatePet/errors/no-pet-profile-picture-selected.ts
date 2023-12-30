export class NoPetProfilePictureSelected extends Error {
  public constructor() {
    super('Por favor, selecione uma foto de perfil para o Pet :)');
  }
}
