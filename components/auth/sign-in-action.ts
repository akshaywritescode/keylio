"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { createSession } from "@/lib/auth/session"
import { verifyPassword } from "@/lib/auth/passwords"
import { prisma } from "@/lib/db/prisma"

export type SignInActionState = {
  values?: {
    email?: string
  }
  errors?: {
    email?: string
    password?: string
    form?: string
  }
}

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or less."),
  password: z.string().min(1, "Enter your password.").max(128, "Password is too long."),
  redirectUrl: z
    .string()
    .trim()
    .min(1)
    .refine((value) => value.startsWith("/") && !value.startsWith("//"), "Redirect URL must be internal.")
    .default("/dashboard"),
})

export async function signInAction(_: SignInActionState, formData: FormData): Promise<SignInActionState> {
  const rawValues = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    redirectUrl: String(formData.get("redirect_url") ?? "/dashboard"),
  }

  const parsed = signInSchema.safeParse(rawValues)
  const values = {
    email: rawValues.email,
  }

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors

    return {
      values,
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    }
  }

  const email = parsed.data.email.toLowerCase()
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user?.passwordHash) {
    return {
      values,
      errors: {
        form: "Invalid email or password.",
      },
    }
  }

  const passwordMatches = await verifyPassword(parsed.data.password, user.passwordHash)

  if (!passwordMatches) {
    return {
      values,
      errors: {
        form: "Invalid email or password.",
      },
    }
  }

  if (!user.emailVerifiedAt) {
    return {
      values,
      errors: {
        form: "Verify your email before signing in.",
      },
    }
  }

  await createSession(user.id)
  redirect(parsed.data.redirectUrl)
}
