"use server"

import { z } from "zod"
import { createAuthToken, getExpirationDate, hashAuthToken, PASSWORD_RESET_TOKEN_SECONDS } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"
import { sendPasswordResetEmail } from "@/lib/email"

export type ForgotPasswordActionState = {
  values?: {
    email?: string
  }
  errors?: {
    email?: string
    form?: string
  }
  success?: string
}

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or less."),
})

export async function forgotPasswordAction(
  _: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const rawValues = {
    email: String(formData.get("email") ?? ""),
  }

  const parsed = forgotPasswordSchema.safeParse(rawValues)
  const values = {
    email: rawValues.email,
  }

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors

    return {
      values,
      errors: {
        email: fieldErrors.email?.[0],
      },
    }
  }

  const email = parsed.data.email.toLowerCase()
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    const resetToken = createAuthToken()
    const tokenHash = hashAuthToken(resetToken)
    const expiresAt = getExpirationDate(PASSWORD_RESET_TOKEN_SECONDS)

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    })

    await sendPasswordResetEmail({
      email,
      token: resetToken,
    })
  }

  return {
    values,
    success: "If an account exists for that email, a reset link has been generated.",
  }
}
