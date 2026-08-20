import Link from "next/link"
import { MailCheck } from "lucide-react"
import { AuthButton, AuthCard } from "./auth-shell"

type VerifyEmailProps = {
  signInUrl?: string
}

export function VerifyEmail({ signInUrl = "/sign-in" }: VerifyEmailProps) {
  return (
    <AuthCard
      title="Verify your email"
      description="We sent a verification link to your inbox. Confirm your address to finish setting up the account."
      footer={
        <>
          Wrong account?{" "}
          <Link href={signInUrl} className="font-medium text-white hover:underline">
            Sign in instead
          </Link>
        </>
      }
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
        <MailCheck className="h-6 w-6 text-emerald-400" />
      </div>
      <div className="space-y-3">
        <AuthButton type="button">Open mail app</AuthButton>
        <AuthButton type="button" variant="secondary">
          Resend verification email
        </AuthButton>
      </div>
    </AuthCard>
  )
}
