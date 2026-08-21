"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { hashAuthToken } from "@/lib/auth"
import { hashPassword } from "@/lib/auth/passwords"
import { prisma } from "@/lib/db/prisma"

export type ResetPasswordActionState = {
  values?: {
    email?: string
    token?: string
  }
  errors?: {
    email?: string
    token?: string
    password?: string
    confirmPassword?: string
    form?: string
  }
}

const resetPasswordSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or less."),
    token: z.string().trim().min(16, "Enter the reset token."),
    password: z.string().min(8, "Password must be at least 8 characters.").max(128, "Password is too long."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    redirectUrl: z
      .string()
      .trim()
      .min(1)
      .refine((value) => value.startsWith("/") && !value.startsWith("//"), "Redirect URL must be internal.")
      .default("/sign-in"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export async function resetPasswordAction(
  _: ResetPasswordActionState,
  formData: FormData,
): Promise<ResetPasswordActionState> {
  const rawValues = {
    email: String(formData.get("email") ?? ""),
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirm-password") ?? ""),
    redirectUrl: String(formData.get("redirect_url") ?? "/sign-in"),
  }

  const parsed = resetPasswordSchema.safeParse(rawValues)
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
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      },
    }
  }

  const email = parsed.data.email.toLowerCase()
  const tokenHash = hashAuthToken(parsed.data.token)
  const now = new Date()

  const resetToken = await prisma.passwordResetToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: {
        gt: now,
      },
      user: {
        email,
      },
    },
    include: {
      user: true,
    },
  })

  if (!resetToken) {
    return {
      values,
      errors: {
        form: "This reset token is invalid or expired.",
      },
    }
  }

  const passwordHash = await hashPassword(parsed.data.password)

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        passwordHash,
      },
    }),
    prisma.passwordResetToken.update({
      where: {
        id: resetToken.id,
      },
      data: {
        usedAt: now,
      },
    }),
    prisma.session.updateMany({
      where: {
        userId: resetToken.userId,
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    }),
  ])

  redirect(`${parsed.data.redirectUrl}?reset=1&email=${encodeURIComponent(email)}`)
}
