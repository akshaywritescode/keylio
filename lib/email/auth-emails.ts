type AuthEmailInput = {
  email: string
  token: string
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
}

function createAuthUrl(path: string, { email, token }: AuthEmailInput) {
  const url = new URL(path, getAppUrl())
  url.searchParams.set("email", email)
  url.searchParams.set("token", token)
  return url.toString()
}

function logDevEmail(subject: string, to: string, url: string) {
  console.info(
    [
      "",
      "---------------- Keylio dev email ----------------",
      `To: ${to}`,
      `Subject: ${subject}`,
      "",
      url,
      "---------------------------------------------------",
      "",
    ].join("\n"),
  )
}

export async function sendEmailVerificationEmail(input: AuthEmailInput) {
  const verificationUrl = createAuthUrl("/verify-mail", input)
  logDevEmail("Verify your Keylio email", input.email, verificationUrl)
}

export async function sendPasswordResetEmail(input: AuthEmailInput) {
  const resetUrl = createAuthUrl("/reset-password", input)
  logDevEmail("Reset your Keylio password", input.email, resetUrl)
}
