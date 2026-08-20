import Link from "next/link"
import { Github } from "lucide-react"
import { AuthButton, AuthDivider, AuthField, AuthShell } from "@/components/auth/auth-shell"

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start with a developer workspace you can host and control."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-white hover:underline">
            Sign in
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
        <AuthField id="name" label="Name" placeholder="Akshay" autoComplete="name" />
        <AuthField id="email" label="Email" type="email" placeholder="you@company.com" autoComplete="email" />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
        <AuthButton type="submit">Create account</AuthButton>
      </form>
    </AuthShell>
  )
}
