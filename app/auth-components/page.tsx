import Link from "next/link"
import { KeyRound } from "lucide-react"
import { ForgotPassword, ResetPassword, SignIn, SignUp, VerifyEmail } from "@/components/auth"

const components = [
  { name: "SignIn", component: <SignIn /> },
  { name: "SignUp", component: <SignUp /> },
  { name: "ForgotPassword", component: <ForgotPassword /> },
  { name: "ResetPassword", component: <ResetPassword /> },
  { name: "VerifyEmail", component: <VerifyEmail /> },
]

export default function AuthComponentsPage() {
  return (
    <main className="min-h-screen bg-[#09090B] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
            <KeyRound className="h-5 w-5" />
            Keylio
          </Link>
          <Link href="/sign-in" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
            Open sign in
          </Link>
        </header>

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm text-zinc-500">Auth components</p>
          <h1 className="text-4xl font-medium leading-tight tracking-normal text-white">
            Reusable authentication screens for self-hosted apps.
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            These are UI-only previews for the first Keylio auth component API. The forms expose redirect fields and
            route props so backend actions can be wired in without reshaping the interface.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {components.map((item) => (
            <div key={item.name} className="min-w-0">
              <div className="mb-3 font-mono text-xs text-zinc-600">{`<${item.name} />`}</div>
              {item.component}
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
