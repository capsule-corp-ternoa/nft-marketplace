import { removeURLSlash } from "./strings"

export const SORT_OPTION_CREATED_AT_ASC = "created_at:asc";
export const SORT_OPTION_CREATED_AT_DESC = "created_at:desc";
export const SORT_OPTION_PRICE_ASC = "price_rounded:asc";
export const SORT_OPTION_PRICE_DESC = "price_rounded:desc";
export const SORT_OPTION_TIMESTAMP_CREATE_ASC = "timestamp_create:asc";
export const SORT_OPTION_TIMESTAMP_CREATE_DESC = "timestamp_create:desc";

export const SORT_OPTIONS = [SORT_OPTION_CREATED_AT_ASC, SORT_OPTION_CREATED_AT_DESC, SORT_OPTION_PRICE_ASC, SORT_OPTION_PRICE_DESC, SORT_OPTION_TIMESTAMP_CREATE_ASC, SORT_OPTION_TIMESTAMP_CREATE_DESC] as const;

export const DEFAULT_LIMIT_PAGINATION = "12"
export const MARKETPLACE_ID = process.env.NEXT_PUBLIC_MARKETPLACE_ID || "0"
export const SOCKET_URL = (process.env.NEXT_PUBLIC_SOCKET_API && removeURLSlash(process.env.NEXT_PUBLIC_SOCKET_API)) || (process.env.NEXT_PUBLIC_NODE_API && removeURLSlash(process.env.NEXT_PUBLIC_NODE_API)) || ""
export const NODE_API_URL = process.env.NEXT_PUBLIC_NODE_API && removeURLSlash(process.env.NEXT_PUBLIC_NODE_API)
export const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL ? removeURLSlash(process.env.NEXT_PUBLIC_EXPLORER_URL) : "https://explorer.ternoa.com/"