'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { awards } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createAward(formData: FormData) {
  const userId = await getUserId()

  await db.insert(awards).values({
    userId,
    title: String(formData.get('title') || ''),
    issuer: String(formData.get('issuer') || ''),
    year: String(formData.get('year') || ''),
    description: String(formData.get('description') || ''),
    sortOrder: Number(formData.get('sortOrder') || 0),
  })

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateAward(id: number, formData: FormData) {
  const userId = await getUserId()

  await db
    .update(awards)
    .set({
      title: String(formData.get('title') || ''),
      issuer: String(formData.get('issuer') || ''),
      year: String(formData.get('year') || ''),
      description: String(formData.get('description') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    })
    .where(and(eq(awards.id, id), eq(awards.userId, userId)))

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteAward(id: number) {
  const userId = await getUserId()

  await db.delete(awards).where(and(eq(awards.id, id), eq(awards.userId, userId)))

  revalidatePath('/')
  revalidatePath('/admin')
}
