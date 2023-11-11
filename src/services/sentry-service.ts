import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

import { env } from '@Constants/env';

export interface IStartProcedureParams {
  context: string;
  data: NonNullable<any>;
  description: string | undefined;
}

type MicroserviceTag = 'social' | 'files';

export interface IStartHttpProcedureParams {
  context: string;
  payload: NonNullable<any>;
  description?: string;
  microservice: MicroserviceTag;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export class SentryService {
  public static setup() {
    Sentry.init({
      enabled: true,
      dsn: env.EXPO_PUBLIC_SENTRY_DSN,
      environment: env.EXPO_PUBLIC_APP_ENV,
      enableInExpoDevelopment: true,
      debug: env.EXPO_PUBLIC_APP_ENV === 'development',
      tracesSampleRate: env.EXPO_PUBLIC_APP_ENV === 'development' ? 1.0 : 0.8,
      _experiments: {
        profilesSampleRate:
          env.EXPO_PUBLIC_APP_ENV === 'development' ? 1.0 : 0.8,
      },
    });
  }

  public static captureException(exception: any) {
    Sentry.Native.captureException(exception);
  }

  public static startTransaction({
    context,
    description,
    data,
  }: IStartProcedureParams) {
    const transaction = Sentry.Native.startTransaction({
      name: `adoptgram:mobile:${context}`,
      description,
      data: {
        ...data,
      },
    });

    transaction.setContext('platform', {
      reactNativeVersion: Platform.constants.reactNativeVersion,
      sdkLevel: Platform.Version,
    });

    return transaction;
  }

  public static startHttpTransaction({
    context,
    description,
    payload,
    microservice,
    endpoint,
    method,
  }: IStartHttpProcedureParams) {
    const parsedPayload = this.omitSensitiveEntries(payload);

    const transaction = Sentry.Native.startTransaction({
      name: `adoptgram:mobile:request:${context}`,
      description,
      data: {
        ...parsedPayload,
      },
      tags: {
        mobile: true,
        request: true,
        microservice,
      },
    });

    transaction.setContext('platform', {
      reactNativeVersion: Platform.constants.reactNativeVersion,
      sdkLevel: Platform.Version,
    });

    transaction.setContext('request', {
      microservice,
      endpoint,
      method,
    });

    return transaction;
  }

  private static omitSensitiveEntries(data: any) {
    const redactedPayload = data;

    if ('password' in redactedPayload) {
      redactedPayload.password = '<REDACTED>';
    }

    return redactedPayload;
  }
}
