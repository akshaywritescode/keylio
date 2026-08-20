"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AuthButton, AuthField } from "./auth-shell"
import { verifyEmailAction, type VerifyEmailActionState } from "./verify-email-action"

type VerifyEmailFormProps = {
  email?: string
}

const initialState: VerifyEmailActionState = {}

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const [state, formAction] = useActionState(verifyEmailAction, {
    ...initialState,
    values: {
      email,
    },
  })

  return (
    <form action={formAction} className="space-y-5">
      {state.errors?.form ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.errors.form}
        </p>
      ) : null}
      <AuthField
        id="email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.errors?.email}
      />
      <AuthField
        id="token"
        label="Verification token"
        placeholder="Paste the token from your server log"
        autoComplete="one-time-code"
        defaultValue={state.values?.token}
        error={state.errors?.token}
      />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <AuthButton type="submit" disabled={pending}>
      {pending ? "Verifying..." : "Verify email"}
    </AuthButton>
  )
}
