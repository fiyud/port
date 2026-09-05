'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { experience } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createExperience(formData: FormData) {
  const userId = await getUserId()

  await db.insert(experience).values({
    userId,
    category: String(formData.get('category') || 'research'),
    role: String(formData.get('role') || ''),
    organization: String(formData.get('organization') || ''),
    location: String(formData.get('location') || ''),
    startDate: String(formData.get('startDate') || ''),
    endDate: String(formData.get('endDate') || ''),
    description: String(formData.get('description') || ''),
    sortOrder: Number(formData.get('sortOrder') || 0),
  })

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateExperience(id: number, formData: FormData) {
  const userId = await getUserId()

  await db
    .update(experience)
    .set({
      category: String(formData.get('category') || 'research'),
      role: String(formData.get('role') || ''),
      organization: String(formData.get('organization') || ''),
      location: String(formData.get('location') || ''),
      startDate: String(formData.get('startDate') || ''),
      endDate: String(formData.get('endDate') || ''),
      description: String(formData.get('description') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    })
    .where(and(eq(experience.id, id), eq(experience.userId, userId)))

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteExperience(id: number) {
  const userId = await getUserId()

  await db
    .delete(experience)
    .where(and(eq(experience.id, id), eq(experience.userId, userId)))

  revalidatePath('/')
  revalidatePath('/admin')
}
