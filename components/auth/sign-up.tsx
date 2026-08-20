import Link from "next/link"
import { AuthCard, AuthDivider, OAuthButtons } from "./auth-shell"
import { SignUpForm } from "./sign-up-form"

type SignUpProps = {
  signInUrl?: string
  afterSignUpUrl?: string
}

export function SignUp({ signInUrl = "/sign-in", afterSignUpUrl = "/verify-mail" }: SignUpProps) {
  return (
    <AuthCard
      title="Create your account"
      description="Start with a developer workspace you can host and control."
      footer={
        <>
          Already have an account?{" "}
          <Link href={signInUrl} className="font-medium text-white hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <OAuthButtons />

      <div className="my-6">
        <AuthDivider />
      </div>

      <SignUpForm afterSignUpUrl={afterSignUpUrl} />
    </AuthCard>
  )
}
