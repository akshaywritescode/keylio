import Link from "next/link"
import { AuthCard } from "./auth-shell"
import { ResetPasswordForm } from "./reset-password-form"

type ResetPasswordProps = {
  email?: string
  token?: string
  forgotPasswordUrl?: string
  afterResetUrl?: string
}

export function ResetPassword({
  email,
  token,
  forgotPasswordUrl = "/forgot-password",
  afterResetUrl = "/sign-in",
}: ResetPasswordProps) {
  return (
    <AuthCard
      title="Choose a new password"
      description="Create a strong password to regain access to your account."
      footer={
        <>
          Need a new recovery link?{" "}
          <Link href={forgotPasswordUrl} className="font-medium text-white hover:underline">
            Request one
          </Link>
        </>
      }
    >
      <ResetPasswordForm afterResetUrl={afterResetUrl} email={email} token={token} />
    </AuthCard>
  )
}
