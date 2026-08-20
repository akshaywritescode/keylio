import { KeyRound, ShieldCheck, UserRound } from "lucide-react"
import { requireCurrentUser } from "@/lib/auth"

export default async function DashboardPage() {
  const user = await requireCurrentUser()

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
        <header className="flex h-20 items-center justify-between border-b border-zinc-900">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <KeyRound className="h-5 w-5" />
            Keylio
          </div>
          <div className="text-sm text-zinc-500">Dashboard</div>
        </header>

        <section className="grid flex-1 content-center gap-6 py-16">
          <div>
            <p className="mb-3 text-sm text-emerald-400">Authenticated session</p>
            <h1 className="text-4xl font-medium tracking-normal text-white">Welcome, {user.name ?? user.email}</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              This page is protected by a Keylio session cookie backed by the database.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900">
                <UserRound className="h-5 w-5 text-zinc-300" />
              </div>
              <h2 className="font-medium text-white">User</h2>
              <p className="mt-2 text-sm text-zinc-500">{user.email}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="font-medium text-white">Email verified</h2>
              <p className="mt-2 text-sm text-zinc-500">
                {user.emailVerifiedAt ? user.emailVerifiedAt.toLocaleString() : "Not verified"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
