"use server"

import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/lib/db/prisma"
import { EMAIL_VERIFICATION_TOKEN_SECONDS, createAuthToken, getExpirationDate, hashAuthToken } from "@/lib/auth"
import { hashPassword } from "@/lib/auth/passwords"

export type SignUpActionState = {
  values?: {
    name?: string
    email?: string
  }
  errors?: {
    name?: string
    email?: string
    password?: string
    form?: string
  }
}

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(80, "Name must be 80 characters or less."),
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or less."),
  password: z.string().min(8, "Password must be at least 8 characters.").max(128, "Password is too long."),
  redirectUrl: z
    .string()
    .trim()
    .min(1)
    .refine((value) => value.startsWith("/") && !value.startsWith("//"), "Redirect URL must be internal.")
    .default("/verify-mail"),
})

export async function signUpAction(_: SignUpActionState, formData: FormData): Promise<SignUpActionState> {
  const rawValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    redirectUrl: String(formData.get("redirect_url") ?? "/verify-mail"),
  }

  const parsed = signUpSchema.safeParse(rawValues)
  const values = {
    name: rawValues.name,
    email: rawValues.email,
  }

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors

    return {
      values,
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    }
  }

  const name = parsed.data.name
  const email = parsed.data.email.toLowerCase()
  const passwordHash = await hashPassword(parsed.data.password)
  const verificationToken = createAuthToken()
  const tokenHash = hashAuthToken(verificationToken)
  const expiresAt = getExpirationDate(EMAIL_VERIFICATION_TOKEN_SECONDS)

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          email,
          tokenHash,
          expiresAt,
        },
      })
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        values,
        errors: {
          email: "An account with this email already exists.",
        },
      }
    }

    return {
      values,
      errors: {
        form: "Could not create your account. Please try again.",
      },
    }
  }

  console.info(`Keylio verification token for ${email}: ${verificationToken}`)
  redirect(`${parsed.data.redirectUrl}?email=${encodeURIComponent(email)}`)
}
