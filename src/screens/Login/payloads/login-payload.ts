export type LoginPayload = {
  email: string
  password: string
  kind: "CommonUser" | "Organization"
}
