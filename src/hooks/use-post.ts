import { useContext } from "react";

import { PostContext } from "@Store/PostContext"

export function usePost() {
  return useContext(PostContext)
}
