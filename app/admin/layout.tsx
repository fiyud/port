import Link from 'next/link'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { SignOutButton } from '@/components/admin/sign-out-button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })

  // /admin/login renders its own centered layout and handles its own
  // redirect-if-authed logic, so this shell only wraps authenticated routes.
  if (!session?.user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-serif text-lg text-foreground">
            Dashboard
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              target="_blank"
              className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
            >
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  )
}
