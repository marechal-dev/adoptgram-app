import { Mask, Masks } from 'react-native-mask-input';

export const cpfMask: Mask = Masks.BRL_CPF;

export const cnpjMask: Mask = Masks.BRL_CNPJ;

export const cellphoneNumberMask: Mask = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  '9',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const residentialPhoneNumberMask: Mask = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const cepMask: Mask = Masks.ZIP_CODE;
