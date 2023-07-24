import { z } from "zod"

export const registerOrganizationFormSchema = z
  .object({
    username: z
      .string()
      .min(6, "Seu nome de usuário deve ter no mínimo 6 caracteres."),
    email: z.string().email("E-mail informado tem formato inválido."),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .max(64, "A senha deve ter no máximo 64 caracteres."),
    confirmPassword: z
      .string()
      .min(8, "Sua senha deve ter no mínimo 8 dígitos")
      .max(64, "A senha deve ter no máximo 64 caracteres."),
    title: z.string().min(4).max(120),
    representativeName: z.string().min(2),
    whatsapp: z
      .string()
      .regex(
        /\([0-9]{2}\)\s{1}[\9]{1}[0-9]{4}[-]{1}[0-9]{4}/,
        "Formato do número de WhatsApp inválido",
      ),
    residentialPhone: z
      .string()
      .regex(
        /\([0-9]{2}\)\s{1}[0-9]{4}[-]{1}[0-9]{4}/,
        "Formato do Telefone Residencial inválido",
      )
      .optional(),
    firstLine: z.string(),
    secondLine: z.string().optional(),
    number: z.string(),
    cep: z.string().regex(/[0-9]{5}[-]{1}[0-9]{3}/, "CEP inválido"),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    pixKey: z.string().optional(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.confirmPassword
    },
    {
      message: "Senhas não conferem.",
      path: ["passwordConfirm"],
    },
  )

export type RegisterOrganizationFormData = z.output<
  typeof registerOrganizationFormSchema
>
