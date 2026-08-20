import Link from "next/link"
import { Github } from "lucide-react"
import { AuthButton, AuthDivider, AuthField, AuthShell } from "@/components/auth/auth-shell"

export default function SignInPage() {
  return (
    <AuthShell
      title="Sign in to Keylio"
      description="Use your account credentials to access the workspace."
      footer={
        <>
          New to Keylio?{" "}
          <Link href="/sign-up" className="font-medium text-white hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <AuthButton variant="secondary">
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </AuthButton>
        <AuthButton variant="secondary">Google</AuthButton>
      </div>

      <div className="my-6">
        <AuthDivider />
      </div>

      <form className="space-y-5">
        <AuthField id="email" label="Email" type="email" placeholder="you@company.com" autoComplete="email" />
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="password" className="text-sm font-medium text-zinc-300">
              Password
            </label>
            <Link href="/forgot-password" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-800"
          />
        </div>
        <AuthButton type="submit">Sign in</AuthButton>
      </form>
    </AuthShell>
  )
}
