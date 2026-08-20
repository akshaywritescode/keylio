import Link from "next/link"
import { AuthButton, AuthCard, AuthField } from "./auth-shell"

type ForgotPasswordProps = {
  signInUrl?: string
}

export function ForgotPassword({ signInUrl = "/sign-in" }: ForgotPasswordProps) {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and Keylio will send a recovery link."
      footer={
        <>
          Remembered it?{" "}
          <Link href={signInUrl} className="font-medium text-white hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <AuthField id="email" label="Email" type="email" placeholder="you@company.com" autoComplete="email" />
        <AuthButton type="submit">Send reset link</AuthButton>
      </form>
    </AuthCard>
  )
}
