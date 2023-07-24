import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("E-mail informado tem formato inválido."),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(64, "A senha deve ter no máximo 64 caracteres."),
  kind: z.enum(["CommonUser", "Organization"] as const),
})

export type LoginFormData = z.output<typeof loginFormSchema>