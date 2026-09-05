'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="h-auto rounded-none p-0 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:bg-transparent hover:text-foreground"
    >
      Sign out
    </Button>
  )
}
