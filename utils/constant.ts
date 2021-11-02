import { removeURLSlash } from "./strings"

export const DEFAULT_LIMIT_PAGINATION = "10"
export const MARKETPLACE_ID = process.env.NEXT_PUBLIC_MARKETPLACE_ID || "0"
export const SOCKET_URL = (process.env.NEXT_PUBLIC_SOCKET_API && removeURLSlash(process.env.NEXT_PUBLIC_SOCKET_API)) || (process.env.NEXT_PUBLIC_NODE_API && removeURLSlash(process.env.NEXT_PUBLIC_NODE_API)) || ""
export const NODE_API_URL = process.env.NEXT_PUBLIC_NODE_API && removeURLSlash(process.env.NEXT_PUBLIC_NODE_API)