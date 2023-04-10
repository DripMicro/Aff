import { env } from "@/env.mjs";

export const isSSR = () => typeof window === "undefined";
export const isDev = () => env.NEXTAUTH_URL.includes("localhost");
