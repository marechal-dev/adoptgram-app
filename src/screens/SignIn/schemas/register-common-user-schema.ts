import { z } from 'zod';

export const registerCommonUserFormSchema = z
  .object({
    username: z
      .string({
        required_error: 'Por favor, informe um nome de usuário',
      })
      .min(6, 'Seu nome de usuário deve ter no mínimo 6 caracteres.')
      .max(64, 'Seu nome de usuário deve ter no máximo 64 caracteres.'),
    email: z
      .string({
        required_error: 'Por favor, informe um E-mail.',
      })
      .email('E-mail inválido.'),
    password: z
      .string({
        required_error: 'Por favor, informe uma senha.',
      })
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .max(64, 'A senha deve ter no máximo 64 caracteres.'),
    confirmPassword: z
      .string({
        required_error: 'Por favor, confirme sua senha.',
      })
      .min(8, 'Sua senha deve ter no mínimo 8 dígitos')
      .max(64, 'A senha deve ter no máximo 64 caracteres.'),
    name: z
      .string({
        required_error: 'Por favor, informe seu primeiro nome.',
      })
      .min(2, 'O nome deve conter no mínimo 2 caracteres'),
    cpf: z
      .string({
        required_error: 'Por favor, informe seu CPF',
      })
      .regex(
        /[0-9]{3}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[-]{1}[0-9]{2}/,
        'CPF inválido.',
      ),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Senhas não conferem.',
    path: ['confirmPassword'],
  });

export type RegisterCommonUserFormData = z.output<
  typeof registerCommonUserFormSchema
>;
