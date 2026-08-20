import { AuthShell, SignIn } from "@/components/auth"

type SignInPageProps = {
  searchParams: Promise<{
    email?: string
    verified?: string
  }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { email, verified } = await searchParams

  return (
    <AuthShell>
      <SignIn email={email} verified={verified === "1"} />
    </AuthShell>
  )
}
