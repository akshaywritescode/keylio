import { AuthShell, ResetPassword } from "@/components/auth"

type ResetPasswordPageProps = {
  searchParams: Promise<{
    email?: string
    token?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { email, token } = await searchParams

  return (
    <AuthShell>
      <ResetPassword email={email} token={token} />
    </AuthShell>
  )
}
