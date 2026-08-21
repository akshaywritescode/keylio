import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, KeyRound, Monitor, ShieldX } from "lucide-react"
import { getCurrentSession } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"
import { SignOutButton } from "../sign-out-button"
import { revokeOtherSessionsAction, revokeSessionAction } from "./session-actions"

export default async function SessionsPage() {
  const currentSession = await getCurrentSession()

  if (!currentSession) {
    redirect("/sign-in")
  }

  const sessions = await prisma.session.findMany({
    where: {
      userId: currentSession.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  })

  const activeOtherSessionCount = sessions.filter(
    (session) => session.id !== currentSession.id && !session.revokedAt && session.expiresAt > new Date(),
  ).length

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
        <header className="flex h-20 items-center justify-between border-b border-zinc-900">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-white">
            <KeyRound className="h-5 w-5" />
            Keylio
          </Link>
          <SignOutButton />
        </header>

        <section className="py-10">
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm text-emerald-400">Session management</p>
              <h1 className="text-4xl font-medium tracking-normal text-white">Active devices</h1>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Review where your account is signed in and revoke sessions you no longer trust.
              </p>
            </div>
            <form action={revokeOtherSessionsAction}>
              <button
                type="submit"
                disabled={activeOtherSessionCount === 0}
                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 px-4 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Revoke all other sessions
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80">
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-zinc-800 px-5 py-3 text-sm text-zinc-500">
              <span>{sessions.length} sessions</span>
              <span>{activeOtherSessionCount} other active</span>
            </div>
            <div className="divide-y divide-zinc-900">
              {sessions.map((session) => {
                const isCurrent = session.id === currentSession.id
                const isExpired = session.expiresAt <= new Date()
                const isActive = !session.revokedAt && !isExpired

                return (
                  <div key={session.id} className="grid gap-4 px-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900">
                          <Monitor className="h-4 w-4 text-zinc-400" />
                        </span>
                        <span className="font-medium text-white">{isCurrent ? "Current session" : "Session"}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {isActive ? "Active" : session.revokedAt ? "Revoked" : "Expired"}
                        </span>
                      </div>
                      <p className="truncate text-sm text-zinc-400">{session.userAgent ?? "Unknown device"}</p>
                      <div className="mt-3 grid gap-2 text-xs text-zinc-600 sm:grid-cols-3">
                        <span>IP: {session.ipAddress ?? "Unknown"}</span>
                        <span>Created: {session.createdAt.toLocaleString()}</span>
                        <span>Expires: {session.expiresAt.toLocaleString()}</span>
                      </div>
                    </div>

                    <form action={revokeSessionAction}>
                      <input type="hidden" name="session_id" value={session.id} />
                      <button
                        type="submit"
                        disabled={!isActive}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ShieldX className="h-4 w-4" />
                        Revoke
                      </button>
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
