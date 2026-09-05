'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { publications } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createPublication(formData: FormData) {
  const userId = await getUserId()

  await db.insert(publications).values({
    userId,
    title: String(formData.get('title') || ''),
    authors: String(formData.get('authors') || ''),
    venue: String(formData.get('venue') || ''),
    rank: String(formData.get('rank') || ''),
    year: String(formData.get('year') || ''),
    link: String(formData.get('link') || ''),
    sortOrder: Number(formData.get('sortOrder') || 0),
  })

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updatePublication(id: number, formData: FormData) {
  await requireSession()

  await db
    .update(publications)
    .set({
      title: String(formData.get('title') || ''),
      authors: String(formData.get('authors') || ''),
      venue: String(formData.get('venue') || ''),
      rank: String(formData.get('rank') || ''),
      year: String(formData.get('year') || ''),
      link: String(formData.get('link') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    })
    .where(and(eq(publications.id, id), eq(publications.userId, OWNER_ID)))

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deletePublication(id: number) {
  await requireSession()

  await db
    .delete(publications)
    .where(and(eq(publications.id, id), eq(publications.userId, OWNER_ID)))

  revalidatePath('/')
  revalidatePath('/admin')
}
