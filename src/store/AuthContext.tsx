import { ReactNode, useState, createContext } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

type AuthContextProps = {
  authToken: string
  isAuthenticated: boolean
  authenticate: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function authenticate(token: string) {
    AsyncStorage.setItem("adoptgram:authToken", token)
    setAuthToken(token)
    setIsAuthenticated(true)
  }

  function logout() {
    AsyncStorage.removeItem("adoptgram:authToken")
    setAuthToken("")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
