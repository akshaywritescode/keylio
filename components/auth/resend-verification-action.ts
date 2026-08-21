"use server"

import { z } from "zod"
import { EMAIL_VERIFICATION_TOKEN_SECONDS, createAuthToken, getExpirationDate, hashAuthToken } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"
import { sendEmailVerificationEmail } from "@/lib/email"

export type ResendVerificationActionState = {
  values?: {
    email?: string
  }
  errors?: {
    email?: string
    form?: string
  }
  success?: string
}

const resendVerificationSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or less."),
})

export async function resendVerificationAction(
  _: ResendVerificationActionState,
  formData: FormData,
): Promise<ResendVerificationActionState> {
  const rawValues = {
    email: String(formData.get("email") ?? ""),
  }

  const parsed = resendVerificationSchema.safeParse(rawValues)
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

  if (user && !user.emailVerifiedAt) {
    const verificationToken = createAuthToken()

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        email,
        tokenHash: hashAuthToken(verificationToken),
        expiresAt: getExpirationDate(EMAIL_VERIFICATION_TOKEN_SECONDS),
      },
    })

    await sendEmailVerificationEmail({
      email,
      token: verificationToken,
    })
  }

  return {
    values,
    success: "If this email needs verification, a fresh verification link has been generated.",
  }
}
