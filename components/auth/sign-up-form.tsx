"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AuthButton, AuthField, PasswordField } from "./auth-shell"
import { signUpAction, type SignUpActionState } from "./sign-up-action"

type SignUpFormProps = {
  afterSignUpUrl: string
}

const initialState: SignUpActionState = {}

export function SignUpForm({ afterSignUpUrl }: SignUpFormProps) {
  const [state, formAction] = useActionState(signUpAction, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect_url" value={afterSignUpUrl} />
      {state.errors?.form ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.errors.form}
        </p>
      ) : null}
      <AuthField
        id="name"
        label="Name"
        placeholder="Akshay"
        autoComplete="name"
        defaultValue={state.values?.name}
        error={state.errors?.name}
      />
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
        placeholder="Create a password"
        autoComplete="new-password"
        error={state.errors?.password}
      />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <AuthButton type="submit" disabled={pending}>
      {pending ? "Creating account..." : "Create account"}
    </AuthButton>
  )
}
