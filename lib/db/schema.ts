import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
} from 'drizzle-orm/pg-core'

// ---------- Better Auth tables ----------

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  issuer: text('issuer').notNull().default(''),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
})

// ---------- App tables ----------

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  fullName: text('fullName').notNull().default(''),
  title: text('title').notNull().default(''),
  tagline: text('tagline').notNull().default(''),
  bio: text('bio').notNull().default(''),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  location: text('location').notNull().default(''),
  linkedin: text('linkedin').notNull().default(''),
  github: text('github').notNull().default(''),
  scholar: text('scholar').notNull().default(''),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// category: 'research' | 'work'
export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  category: text('category').notNull(),
  role: text('role').notNull().default(''),
  organization: text('organization').notNull().default(''),
  location: text('location').notNull().default(''),
  startDate: text('startDate').notNull().default(''),
  endDate: text('endDate').notNull().default(''),
  description: text('description').notNull().default(''),
  sortOrder: integer('sortOrder').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const publications = pgTable('publications', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull().default(''),
  authors: text('authors').notNull().default(''),
  venue: text('venue').notNull().default(''),
  rank: text('rank').notNull().default(''),
  year: text('year').notNull().default(''),
  link: text('link').notNull().default(''),
  sortOrder: integer('sortOrder').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  institution: text('institution').notNull().default(''),
  degree: text('degree').notNull().default(''),
  location: text('location').notNull().default(''),
  startDate: text('startDate').notNull().default(''),
  endDate: text('endDate').notNull().default(''),
  description: text('description').notNull().default(''),
  sortOrder: integer('sortOrder').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const awards = pgTable('awards', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull().default(''),
  issuer: text('issuer').notNull().default(''),
  year: text('year').notNull().default(''),
  description: text('description').notNull().default(''),
  sortOrder: integer('sortOrder').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
