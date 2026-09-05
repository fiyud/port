'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { profile } from '@/lib/db/schema'
import { OWNER_ID } from '@/lib/content'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session
}

export async function updateProfile(formData: FormData) {
  await requireSession()

  const data = {
    fullName: String(formData.get('fullName') || ''),
    title: String(formData.get('title') || ''),
    tagline: String(formData.get('tagline') || ''),
    bio: String(formData.get('bio') || ''),
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || ''),
    location: String(formData.get('location') || ''),
    linkedin: String(formData.get('linkedin') || ''),
    github: String(formData.get('github') || ''),
    scholar: String(formData.get('scholar') || ''),
    updatedAt: new Date(),
  }

  const existing = await db
    .select({ id: profile.id })
    .from(profile)
    .where(eq(profile.userId, OWNER_ID))
    .limit(1)

  if (existing.length > 0) {
    await db.update(profile).set(data).where(eq(profile.userId, OWNER_ID))
  } else {
    await db.insert(profile).values({ ...data, userId: OWNER_ID })
  }

  revalidatePath('/')
  revalidatePath('/admin')
}
