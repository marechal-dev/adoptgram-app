export class BulkUploadFailedError extends Error {
  public constructor() {
    super('Upload de múltiplas imagens falhou. Tente novamente mais tarde.');
  }
}
