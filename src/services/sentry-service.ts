import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

import { env } from '@Constants/env';

export interface IStartProcedureParams {
  name: `adoptgram:mobile:${string}`;
  data: any;
  description: string | undefined;
}

export interface IStartHttpProcedureParams {
  name: `adoptgram:mobile:request:${string}`;
  payload: NonNullable<any>;
  description?: string;
  route: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export class SentryService {
  public static setup() {
    Sentry.init({
      enabled: true,
      dsn: env.EXPO_PUBLIC_SENTRY_DSN,
      enableInExpoDevelopment: true,
      tracesSampleRate: 1.0,
      debug: true,
    });
  }

  public static captureException(exception: any) {
    Sentry.Native.captureException(exception);
  }

  public static startTransaction({
    name,
    description,
    data,
  }: IStartProcedureParams) {
    const transaction = Sentry.Native.startTransaction({
      name,
      description,
      data: {
        ...data,
      },
    });

    transaction.setContext('platform', {
      os: Platform.OS,
      version: Platform.Version,
    });

    return transaction;
  }

  public static startHttpTransaction({
    name,
    description,
    payload,
    route,
    method,
  }: IStartHttpProcedureParams) {
    const transaction = Sentry.Native.startTransaction({
      name,
      description,
      data: {
        ...payload,
      },
    });

    transaction.setContext('platform', {
      os: Platform.OS,
      version: Platform.Version,
    });

    transaction.setContext('request', {
      route,
      method,
    });

    return transaction;
  }
}
