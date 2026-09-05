'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { education } from '@/lib/db/schema'
import { OWNER_ID } from '@/lib/content'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session
}

export async function createEducation(formData: FormData) {
  await requireSession()

  await db.insert(education).values({
    userId: OWNER_ID,
    institution: String(formData.get('institution') || ''),
    degree: String(formData.get('degree') || ''),
    location: String(formData.get('location') || ''),
    startDate: String(formData.get('startDate') || ''),
    endDate: String(formData.get('endDate') || ''),
    description: String(formData.get('description') || ''),
    sortOrder: Number(formData.get('sortOrder') || 0),
  })

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateEducation(id: number, formData: FormData) {
  await requireSession()

  await db
    .update(education)
    .set({
      institution: String(formData.get('institution') || ''),
      degree: String(formData.get('degree') || ''),
      location: String(formData.get('location') || ''),
      startDate: String(formData.get('startDate') || ''),
      endDate: String(formData.get('endDate') || ''),
      description: String(formData.get('description') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    })
    .where(and(eq(education.id, id), eq(education.userId, OWNER_ID)))

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteEducation(id: number) {
  await requireSession()

  await db
    .delete(education)
    .where(and(eq(education.id, id), eq(education.userId, OWNER_ID)))

  revalidatePath('/')
  revalidatePath('/admin')
}
