import { AuthShell, SignIn } from "@/components/auth"

type SignInPageProps = {
  searchParams: Promise<{
    email?: string
    reset?: string
    verified?: string
  }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { email, reset, verified } = await searchParams

  return (
    <AuthShell>
      <SignIn email={email} reset={reset === "1"} verified={verified === "1"} />
    </AuthShell>
  )
}
