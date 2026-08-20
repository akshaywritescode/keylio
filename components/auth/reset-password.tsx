import Link from "next/link"
import { AuthButton, AuthCard, PasswordField } from "./auth-shell"

type ResetPasswordProps = {
  forgotPasswordUrl?: string
  afterResetUrl?: string
}

export function ResetPassword({
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
      <form className="space-y-5">
        <input type="hidden" name="redirect_url" value={afterResetUrl} />
        <PasswordField
          id="password"
          label="New password"
          placeholder="Enter a new password"
          autoComplete="new-password"
        />
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
        />
        <AuthButton type="submit">Update password</AuthButton>
      </form>
    </AuthCard>
  )
}
