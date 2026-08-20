import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { AUTH_COOKIE_NAME, SESSION_DURATION_SECONDS } from "./config"
import { createAuthToken, getExpirationDate, hashAuthToken } from "./tokens"

export async function createSession(userId: string) {
  const token = createAuthToken()
  const tokenHash = hashAuthToken(token)
  const expiresAt = getExpirationDate(SESSION_DURATION_SECONDS)
  const headerStore = await headers()

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ipAddress: headerStore.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: headerStore.get("user-agent"),
    },
  })

  const cookieStore = await cookies()

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  })
}

export async function getCurrentSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  const tokenHash = hashAuthToken(token)

  return prisma.session.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  })
}

export async function revokeCurrentSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

  if (token) {
    const tokenHash = hashAuthToken(token)

    await prisma.session.updateMany({
      where: {
        tokenHash,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    })
  }

  cookieStore.delete(AUTH_COOKIE_NAME)
}

export async function requireCurrentUser() {
  const session = await getCurrentSession()

  if (!session) {
    redirect("/sign-in")
  }

  return session.user
}
