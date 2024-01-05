import { Platform } from 'react-native';

export class FileService {
  public static getURI(uri: string): string {
    return Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  }

  public static getFileName(uri: string): string {
    const lastSlash = uri.lastIndexOf('/');
    const name = uri.substring(lastSlash + 1, uri.length);

    return name;
  }
}
