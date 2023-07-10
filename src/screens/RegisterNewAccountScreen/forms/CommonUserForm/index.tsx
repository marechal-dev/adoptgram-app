import { View, Text } from "react-native"
import { styles } from "../styles"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const registerCommonUserSchemaValidator = z
  .object({
    name: z.string().min(2),
    surname: z.string().min(2),
    cpf: z.string().min(11),
    whatsappCellphone: z.string().min(11),
    email: z.string().email("Insira um Email válido."),
    password: z.string().min(8, "Sua senha deve ter no míniumo 8 díogitos"),
    confirmPassword: z.string().min(8, "Senhas não conferem."),
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

type RegisterCommonUserFormData = z.infer<
  typeof registerCommonUserSchemaValidator
>

export function CommonUserForm() {
  const { control, handleSubmit } = useForm<RegisterCommonUserFormData>({
    resolver: zodResolver(registerCommonUserSchemaValidator),
  })

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formStepTitle}>Dados Básicos</Text>
    </View>
  )
}
