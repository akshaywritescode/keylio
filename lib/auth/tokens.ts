import { createHmac, randomBytes } from "node:crypto"
import { getAuthSecret } from "./config"

export function createAuthToken(byteLength = 32) {
  return randomBytes(byteLength).toString("base64url")
}

export function hashAuthToken(token: string) {
  return createHmac("sha256", getAuthSecret()).update(token).digest("base64url")
}

export function getExpirationDate(secondsFromNow: number) {
  return new Date(Date.now() + secondsFromNow * 1000)
}
