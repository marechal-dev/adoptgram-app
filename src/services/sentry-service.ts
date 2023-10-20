import * as Sentry from '@sentry/react-native';
import { Platform } from 'react-native';

export interface IStartProcedureParams {
  procedureName: `adoptgram:mobile:${string}`;
  data: any;
  procedureDescription: string | undefined;
}

export class SentryService {
  public static captureException(exception: any) {
    Sentry.captureException(exception);
  }

  public static startProcedure({
    procedureName,
    procedureDescription,
    data,
  }: IStartProcedureParams) {
    return Sentry.startTransaction({
      name: procedureName,
      description: procedureDescription,
      data: {
        ...data,
        platform: Platform.OS,
      },
    });
  }
}
