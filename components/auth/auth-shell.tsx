import type { ReactNode } from "react"
import Link from "next/link"
import { Github, KeyRound } from "lucide-react"

type AuthShellProps = {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
        <header className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
            <KeyRound className="h-5 w-5" />
            Keylio
          </Link>
          <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
            Back to home
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1fr_440px]">
          <div className="hidden max-w-xl lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Self-hosted auth for modern apps
            </div>
            <h1 className="text-5xl font-medium leading-[1.05] tracking-normal text-white">
              Own the whole authentication flow.
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Ship familiar sign-in, sign-up, recovery, and verification flows while keeping users, sessions, and
              policies inside your infrastructure.
            </p>
          </div>

          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <>
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/40 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-medium tracking-normal text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
        </div>
        {children}
      </div>
      {footer ? <div className="mt-6 text-center text-sm text-zinc-500">{footer}</div> : null}
    </>
  )
}

type AuthFieldProps = {
  id: string
  label: string
  type?: string
  placeholder: string
  autoComplete?: string
}

export function AuthField({ id, label, type = "text", placeholder, autoComplete }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800"
      />
    </div>
  )
}

type PasswordFieldProps = Omit<AuthFieldProps, "type"> & {
  action?: ReactNode
}

export function PasswordField({ id, label, placeholder, autoComplete, action }: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-zinc-300">
          {label}
        </label>
        {action}
      </div>
      <input
        id={id}
        name={id}
        type="password"
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800"
      />
    </div>
  )
}

type AuthButtonProps = {
  children: ReactNode
  variant?: "primary" | "secondary"
  type?: "button" | "submit"
}

export function AuthButton({ children, variant = "primary", type = "button" }: AuthButtonProps) {
  const styles =
    variant === "primary"
      ? "border-white bg-white text-zinc-950 hover:bg-zinc-200"
      : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"

  return (
    <button
      type={type}
      className={`flex h-11 w-full items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
    </button>
  )
}

export function OAuthButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <AuthButton variant="secondary">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </AuthButton>
      <AuthButton variant="secondary">Google</AuthButton>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="text-xs text-zinc-600">or</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  )
}
