import Link from "next/link"
import { AuthButton, AuthField, AuthShell } from "@/components/auth/auth-shell"

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Choose a new password"
      description="Create a strong password to regain access to your account."
      footer={
        <>
          Need a new recovery link?{" "}
          <Link href="/forgot-password" className="font-medium text-white hover:underline">
            Request one
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <AuthField
          id="password"
          label="New password"
          type="password"
          placeholder="Enter a new password"
          autoComplete="new-password"
        />
        <AuthField
          id="confirm-password"
          label="Confirm password"
          type="password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
        />
        <AuthButton type="submit">Update password</AuthButton>
      </form>
    </AuthShell>
  )
}
