"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AuthButton, AuthField, PasswordField } from "./auth-shell"
import { signInAction, type SignInActionState } from "./sign-in-action"

type SignInFormProps = {
  afterSignInUrl: string
  email?: string
  forgotPasswordUrl: string
  reset?: boolean
  verified?: boolean
}

export function SignInForm({ afterSignInUrl, email, forgotPasswordUrl, reset, verified }: SignInFormProps) {
  const [state, formAction] = useActionState(signInAction, {
    values: {
      email,
    },
  } satisfies SignInActionState)

  return (
    <form action={formAction} className="space-y-5">
      {verified ? (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Email verified. You can sign in now.
        </p>
      ) : null}
      {reset ? (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Password updated. You can sign in now.
        </p>
      ) : null}
      {state.errors?.form ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.errors.form}
        </p>
      ) : null}
      <input type="hidden" name="redirect_url" value={afterSignInUrl} />
      <AuthField
        id="email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.errors?.email}
      />
      <PasswordField
        id="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        error={state.errors?.password}
        action={
          <Link href={forgotPasswordUrl} className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
            Forgot password?
          </Link>
        }
      />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <AuthButton type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </AuthButton>
  )
}
