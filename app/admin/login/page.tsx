import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { AdminLoginForm } from '@/components/admin/admin-login-form'
import { DotField } from '@/components/effects/dot-field'

export default async function AdminLoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/admin')

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <DotField />
      <div className="relative z-10 w-full max-w-sm">
        <p className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mb-10 text-center font-serif text-3xl text-foreground">
          Sign in to edit
        </h1>
        <AdminLoginForm />
      </div>
    </main>
  )
}
