"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AuthButton, AuthField, PasswordField } from "./auth-shell"
import { resetPasswordAction, type ResetPasswordActionState } from "./reset-password-action"

type ResetPasswordFormProps = {
  afterResetUrl: string
  email?: string
  token?: string
}

export function ResetPasswordForm({ afterResetUrl, email, token }: ResetPasswordFormProps) {
  const [state, formAction] = useActionState(resetPasswordAction, {
    values: {
      email,
      token,
    },
  } satisfies ResetPasswordActionState)

  return (
    <form action={formAction} className="space-y-5">
      {state.errors?.form ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.errors.form}
        </p>
      ) : null}
      <input type="hidden" name="redirect_url" value={afterResetUrl} />
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
        label="Reset token"
        placeholder="Paste the token from your dev email link"
        autoComplete="one-time-code"
        defaultValue={state.values?.token}
        error={state.errors?.token}
      />
      <PasswordField
        id="password"
        label="New password"
        placeholder="Enter a new password"
        autoComplete="new-password"
        error={state.errors?.password}
      />
      <PasswordField
        id="confirm-password"
        label="Confirm password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        error={state.errors?.confirmPassword}
      />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <AuthButton type="submit" disabled={pending}>
      {pending ? "Updating password..." : "Update password"}
    </AuthButton>
  )
}
