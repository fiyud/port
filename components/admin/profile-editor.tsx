'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateProfile } from '@/app/admin/actions/profile'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface ProfileEditorProps {
  profile: {
    fullName: string
    title: string
    tagline: string
    bio: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    scholar: string
  } | null
}

const fields: { name: keyof NonNullable<ProfileEditorProps['profile']>; label: string }[] = [
  { name: 'fullName', label: 'Full name' },
  { name: 'title', label: 'Title / role' },
  { name: 'email', label: 'Email' },
  { name: 'phone', label: 'Phone' },
  { name: 'location', label: 'Location' },
  { name: 'linkedin', label: 'LinkedIn URL' },
  { name: 'github', label: 'GitHub URL' },
  { name: 'scholar', label: 'Google Scholar URL' },
]

export function ProfileEditor({ profile }: ProfileEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [values, setValues] = useState({
    fullName: profile?.fullName || '',
    title: profile?.title || '',
    tagline: profile?.tagline || '',
    bio: profile?.bio || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    linkedin: profile?.linkedin || '',
    github: profile?.github || '',
    scholar: profile?.scholar || '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateProfile(formData)
      toast.success('Profile updated')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <Label htmlFor={field.name} className="text-xs uppercase tracking-[0.15em]">
              {field.label}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={values[field.name]}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              className="rounded-none border-border"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tagline" className="text-xs uppercase tracking-[0.15em]">
          Tagline (shown under your name in the hero)
        </Label>
        <Textarea
          id="tagline"
          name="tagline"
          rows={2}
          value={values.tagline}
          onChange={(e) => setValues((v) => ({ ...v, tagline: e.target.value }))}
          className="rounded-none border-border"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio" className="text-xs uppercase tracking-[0.15em]">
          Biography (one paragraph per line)
        </Label>
        <Textarea
          id="bio"
          name="bio"
          rows={8}
          value={values.bio}
          onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
          className="rounded-none border-border"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-none bg-foreground text-background hover:bg-foreground/90"
      >
        {isPending ? 'Saving…' : 'Save profile'}
      </Button>
    </form>
  )
}
