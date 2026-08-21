"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AuthButton } from "./auth-shell"
import {
  resendVerificationAction,
  type ResendVerificationActionState,
} from "./resend-verification-action"

type ResendVerificationFormProps = {
  email?: string
}

export function ResendVerificationForm({ email }: ResendVerificationFormProps) {
  const [state, formAction] = useActionState(resendVerificationAction, {
    values: {
      email,
    },
  } satisfies ResendVerificationActionState)

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="email" value={state.values?.email ?? ""} />
      {state.success ? <p className="text-sm text-emerald-300">{state.success}</p> : null}
      {state.errors?.email || state.errors?.form ? (
        <p className="text-sm text-red-300">{state.errors.email ?? state.errors.form}</p>
      ) : null}
      <SubmitButton disabled={!state.values?.email} />
    </form>
  )
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <AuthButton type="submit" variant="secondary" disabled={disabled || pending}>
      {pending ? "Generating..." : "Resend verification link"}
    </AuthButton>
  )
}
