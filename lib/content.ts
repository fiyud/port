import { db } from '@/lib/db'
import {
  profile,
  experience,
  publications,
  education,
  awards,
} from '@/lib/db/schema'
import { asc, desc } from 'drizzle-orm'

/**
 * Single-tenant portfolio: there is exactly one admin account, so public
 * pages read every row rather than filtering by a specific userId. Admin
 * write actions still scope by the authenticated session's real userId
 * (see app/admin/actions/*) so edits can only be made while signed in.
 */

export async function getProfile() {
  const rows = await db
    .select()
    .from(profile)
    .orderBy(desc(profile.updatedAt))
    .limit(1)
  return rows[0] ?? null
}

export async function getExperience() {
  return db.select().from(experience).orderBy(asc(experience.sortOrder))
}

export async function getPublications() {
  return db.select().from(publications).orderBy(asc(publications.sortOrder))
}

export async function getEducation() {
  return db.select().from(education).orderBy(asc(education.sortOrder))
}

export async function getAwards() {
  return db.select().from(awards).orderBy(asc(awards.sortOrder))
}

export async function getAllContent() {
  const [profileRow, experienceRows, publicationRows, educationRows, awardRows] =
    await Promise.all([
      getProfile(),
      getExperience(),
      getPublications(),
      getEducation(),
      getAwards(),
    ])
  return {
    profile: profileRow,
    experience: experienceRows,
    publications: publicationRows,
    education: educationRows,
    awards: awardRows,
  }
}
