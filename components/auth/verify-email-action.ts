"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/lib/db/prisma"
import { hashAuthToken } from "@/lib/auth"

export type VerifyEmailActionState = {
  values?: {
    email?: string
    token?: string
  }
  errors?: {
    email?: string
    token?: string
    form?: string
  }
}

const verifyEmailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or less."),
  token: z.string().trim().min(16, "Enter the verification token."),
})

export async function verifyEmailAction(
  _: VerifyEmailActionState,
  formData: FormData,
): Promise<VerifyEmailActionState> {
  const rawValues = {
    email: String(formData.get("email") ?? ""),
    token: String(formData.get("token") ?? ""),
  }

  const parsed = verifyEmailSchema.safeParse(rawValues)
  const values = {
    email: rawValues.email,
    token: rawValues.token,
  }

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors

    return {
      values,
      errors: {
        email: fieldErrors.email?.[0],
        token: fieldErrors.token?.[0],
      },
    }
  }

  const email = parsed.data.email.toLowerCase()
  const tokenHash = hashAuthToken(parsed.data.token)
  const now = new Date()

  const verificationToken = await prisma.emailVerificationToken.findFirst({
    where: {
      email,
      tokenHash,
      usedAt: null,
      expiresAt: {
        gt: now,
      },
    },
    include: {
      user: true,
    },
  })

  if (!verificationToken) {
    return {
      values,
      errors: {
        form: "This verification token is invalid or expired.",
      },
    }
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        emailVerifiedAt: verificationToken.user.emailVerifiedAt ?? now,
      },
    }),
    prisma.emailVerificationToken.update({
      where: {
        id: verificationToken.id,
      },
      data: {
        usedAt: now,
      },
    }),
  ])

  redirect(`/sign-in?verified=1&email=${encodeURIComponent(email)}`)
}
