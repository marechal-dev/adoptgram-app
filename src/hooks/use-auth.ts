import { useContext } from "react";
import { AuthContext } from "@Store/AuthContext";

export function useAuth() {
  return useContext(AuthContext)
}
