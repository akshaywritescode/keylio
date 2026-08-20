import Link from "next/link"
import { AuthButton, AuthCard, AuthDivider, AuthField, OAuthButtons, PasswordField } from "./auth-shell"

type SignInProps = {
  signUpUrl?: string
  forgotPasswordUrl?: string
  afterSignInUrl?: string
  email?: string
  verified?: boolean
}

export function SignIn({
  signUpUrl = "/sign-up",
  forgotPasswordUrl = "/forgot-password",
  afterSignInUrl = "/dashboard",
  email,
  verified,
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

      <form className="space-y-5">
        {verified ? (
          <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            Email verified. You can sign in now.
          </p>
        ) : null}
        <input type="hidden" name="redirect_url" value={afterSignInUrl} />
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          defaultValue={email}
        />
        <PasswordField
          id="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          action={
            <Link href={forgotPasswordUrl} className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
              Forgot password?
            </Link>
          }
        />
        <AuthButton type="submit">Sign in</AuthButton>
      </form>
    </AuthCard>
  )
}
