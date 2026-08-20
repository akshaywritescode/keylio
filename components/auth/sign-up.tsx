import Link from "next/link"
import { AuthButton, AuthCard, AuthDivider, AuthField, OAuthButtons, PasswordField } from "./auth-shell"

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

      <form className="space-y-5">
        <input type="hidden" name="redirect_url" value={afterSignUpUrl} />
        <AuthField id="name" label="Name" placeholder="Akshay" autoComplete="name" />
        <AuthField id="email" label="Email" type="email" placeholder="you@company.com" autoComplete="email" />
        <PasswordField
          id="password"
          label="Password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
        <AuthButton type="submit">Create account</AuthButton>
      </form>
    </AuthCard>
  )
}
