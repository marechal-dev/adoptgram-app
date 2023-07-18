import { View, Text } from "react-native"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { styles } from "../styles"

const registerOrgSchemaValidator = z
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

type RegisterOrgFormData = z.infer<typeof registerOrgSchemaValidator>

export function OrgForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterOrgFormData>({
    resolver: zodResolver(registerOrgSchemaValidator),
  })

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formStepTitle}>Dados Básicos</Text>
      <Text style={styles.formStepTitle}>Endereço</Text>
    </View>
  )
}
