export const AUTH_COOKIE_NAME = "keylio_session"
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30
export const EMAIL_VERIFICATION_TOKEN_SECONDS = 60 * 60 * 24
export const PASSWORD_RESET_TOKEN_SECONDS = 60 * 30

export function getAuthSecret() {
  const secret = process.env.KEYLIO_SECRET

  if (!secret || secret.length < 32) {
    throw new Error("KEYLIO_SECRET must be set to at least 32 characters.")
  }

  return secret
}
