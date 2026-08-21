"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AuthButton, AuthField } from "./auth-shell"
import { forgotPasswordAction, type ForgotPasswordActionState } from "./forgot-password-action"

const initialState: ForgotPasswordActionState = {}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(forgotPasswordAction, initialState)

  return (
    <form action={formAction} className="space-y-5">
      {state.success ? (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {state.success}
        </p>
      ) : null}
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
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <AuthButton type="submit" disabled={pending}>
      {pending ? "Creating reset token..." : "Send reset link"}
    </AuthButton>
  )
}
