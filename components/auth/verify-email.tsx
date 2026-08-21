import Link from "next/link"
import { MailCheck } from "lucide-react"
import { AuthCard } from "./auth-shell"
import { ResendVerificationForm } from "./resend-verification-form"
import { VerifyEmailForm } from "./verify-email-form"

type VerifyEmailProps = {
  email?: string
  signInUrl?: string
}

export function VerifyEmail({ email, signInUrl = "/sign-in" }: VerifyEmailProps) {
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
      <VerifyEmailForm email={email} />
      <div className="mt-5 border-t border-zinc-900 pt-5">
        <ResendVerificationForm email={email} />
      </div>
    </AuthCard>
  )
}
