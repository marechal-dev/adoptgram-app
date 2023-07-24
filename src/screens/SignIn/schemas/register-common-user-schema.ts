import { z } from "zod"

export const registerCommonUserFormSchema = z
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
    firstName: z.string().min(2, "O nome deve conter no mínimo 2 caracteres"),
    surname: z
      .string()
      .min(2, "O sobrenome deve conter no mínimo 2 caracteres"),
    cpf: z
      .string()
      .regex(
        /[0-9]{3}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[-]{1}[0-9]{2}/,
        "CPF com formato inválido.",
      ),
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

export type RegisterCommonUserFormData = z.output<
  typeof registerCommonUserFormSchema
>
