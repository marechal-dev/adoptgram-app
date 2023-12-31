import { z } from 'zod';

export const registerOrganizationFormSchema = z
  .object({
    username: z
      .string({
        required_error: 'Por favor, informe um nome de usuário.',
      })
      .min(6, 'Seu nome de usuário deve ter no mínimo 6 caracteres.'),
    email: z
      .string({
        required_error: 'Por favor, informe um E-mail.',
      })
      .email('E-mail informado tem formato inválido.'),
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
    title: z
      .string({
        required_error: 'Por favor, informe o Título/Razão Social da sua ONG.',
      })
      .min(4)
      .max(120),
    representativeName: z
      .string({
        required_error:
          'Por favor, informe o nome do representante da sua ONG.',
      })
      .min(2),
    cnpj: z
      .string()
      .regex(
        /(?<Subscription>[0-9]{2}.{1}[0-9]{3}.{1}[0-9]{3})\/{1}(?<CompanyTypeIdentifier>0001|0002)-{1}(?<VerifierDigits>[0-9]{2})/,
        'CNPJ com formato inválido.',
      ),
    whatsapp: z
      .string({
        required_error: 'Por favor, informe o número de WhatsApp da sua ONG.',
      })
      .regex(
        /\([0-9]{2}\)\s{1}[\9]{1}[0-9]{4}[-]{1}[0-9]{4}/,
        'Formato do número de WhatsApp inválido',
      ),
    residentialPhone: z
      .string()
      .regex(
        /\([0-9]{2}\)\s{1}[0-9]{4}[-]{1}[0-9]{4}/,
        'Formato do Telefone Residencial inválido',
      )
      .optional(),
    address: z.string({
      required_error: 'Por favor, informe o endereço.',
    }),
    cep: z
      .string({
        required_error: 'Por favor, informe o CEP do local',
      })
      .regex(/[0-9]{5}[-]{1}[0-9]{3}/, 'CEP inválido'),
    city: z.enum(['RG', 'PEL'] as const, {
      required_error: 'Por favor, informe a cidade.',
    }),
    state: z.enum(['RS'] as const, {
      required_error: 'Por favor, informe o estado.',
    }),
    pixKey: z.string().optional(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Senhas não conferem.',
    path: ['passwordConfirm'],
  });

export type RegisterOrganizationFormData = z.output<
  typeof registerOrganizationFormSchema
>;
