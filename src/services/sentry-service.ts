import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

import { env } from '@Constants/env';

export interface IStartProcedureParams {
  context: string;
  data: NonNullable<any>;
  description?: string;
}

type MicroserviceTag = 'social' | 'files';

export interface IStartHttpProcedureParams {
  context: string;
  payload: NonNullable<any>;
  microservice: MicroserviceTag;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  description?: string;
}

export class SentryService {
  public static setup() {
    Sentry.Native.init({
      enabled: true,
      dsn: env.EXPO_PUBLIC_SENTRY_DSN,
      environment: env.EXPO_PUBLIC_APP_ENV,
      debug: env.EXPO_PUBLIC_APP_ENV === 'development',
      tracesSampleRate: env.EXPO_PUBLIC_APP_ENV === 'development' ? 1.0 : 0.7,
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
    const payload = JSON.parse(JSON.stringify(data));
    const redactedEntryText = '<REDACTED>';

    if ('password' in payload) {
      payload.password = redactedEntryText;
    }

    if ('confirmPassword' in payload) {
      payload.confirmPassword = redactedEntryText;
    }

    if ('cpf' in payload) {
      payload.cpf = redactedEntryText;
    }

    if ('cnpj' in payload) {
      payload.cnpj = redactedEntryText;
    }

    return payload;
  }
}
