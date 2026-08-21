import Link from "next/link"
import { AuthCard } from "./auth-shell"
import { ForgotPasswordForm } from "./forgot-password-form"

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
      <ForgotPasswordForm />
    </AuthCard>
  )
}
