import Link from "next/link"
import { AuthCard, AuthDivider, OAuthButtons } from "./auth-shell"
import { SignInForm } from "./sign-in-form"

type SignInProps = {
  signUpUrl?: string
  forgotPasswordUrl?: string
  afterSignInUrl?: string
  email?: string
  verified?: boolean
  reset?: boolean
}

export function SignIn({
  signUpUrl = "/sign-up",
  forgotPasswordUrl = "/forgot-password",
  afterSignInUrl = "/dashboard",
  email,
  verified,
  reset,
}: SignInProps) {
  return (
    <AuthCard
      title="Sign in to Keylio"
      description="Use your account credentials to access the workspace."
      footer={
        <>
          New to Keylio?{" "}
          <Link href={signUpUrl} className="font-medium text-white hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <OAuthButtons />

      <div className="my-6">
        <AuthDivider />
      </div>

      <SignInForm
        afterSignInUrl={afterSignInUrl}
        email={email}
        forgotPasswordUrl={forgotPasswordUrl}
        reset={reset}
        verified={verified}
      />
    </AuthCard>
  )
}
