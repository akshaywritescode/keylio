import { AuthShell, VerifyEmail } from "@/components/auth"

type VerifyMailPageProps = {
  searchParams: Promise<{
    email?: string
  }>
}

export default async function VerifyMailPage({ searchParams }: VerifyMailPageProps) {
  const { email } = await searchParams

  return (
    <AuthShell>
      <VerifyEmail email={email} />
    </AuthShell>
  )
}
