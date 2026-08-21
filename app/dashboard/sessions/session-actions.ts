"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentSession, revokeCurrentSession } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"

export async function revokeSessionAction(formData: FormData) {
  const sessionId = String(formData.get("session_id") ?? "")
  const currentSession = await getCurrentSession()

  if (!currentSession) {
    redirect("/sign-in")
  }

  if (sessionId === currentSession.id) {
    await revokeCurrentSession()
    redirect("/sign-in")
  }

  await prisma.session.updateMany({
    where: {
      id: sessionId,
      userId: currentSession.userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  })

  revalidatePath("/dashboard/sessions")
}

export async function revokeOtherSessionsAction() {
  const currentSession = await getCurrentSession()

  if (!currentSession) {
    redirect("/sign-in")
  }

  await prisma.session.updateMany({
    where: {
      userId: currentSession.userId,
      id: {
        not: currentSession.id,
      },
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  })

  revalidatePath("/dashboard/sessions")
}
