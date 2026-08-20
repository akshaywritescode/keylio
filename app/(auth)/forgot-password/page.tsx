import Link from "next/link"
import { AuthButton, AuthField, AuthShell } from "@/components/auth/auth-shell"

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      description="Enter your email and Keylio will send a recovery link."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/sign-in" className="font-medium text-white hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <AuthField id="email" label="Email" type="email" placeholder="you@company.com" autoComplete="email" />
        <AuthButton type="submit">Send reset link</AuthButton>
      </form>
    </AuthShell>
  )
}
