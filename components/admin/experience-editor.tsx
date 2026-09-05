'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from '@/app/admin/actions/experience'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface ExperienceItem {
  id: number
  category: string
  role: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: string
  sortOrder: number
}

export function ExperienceEditor({
  items,
  category,
  label,
}: {
  items: ExperienceItem[]
  category: 'research' | 'work'
  label: string
}) {
  const filtered = items.filter((i) => i.category === category)

  return (
    <div className="flex flex-col gap-10">
      {filtered.map((item) => (
        <ExperienceRow key={item.id} item={item} />
      ))}
      <NewExperienceRow category={category} label={label} />
    </div>
  )
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateExperience(item.id, formData)
      toast.success('Entry updated')
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteExperience(item.id)
      toast.success('Entry removed')
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-border p-5"
    >
      <input type="hidden" name="category" value={item.category} />
      <div className="grid gap-4 sm:grid-cols-2">
        <RowField label="Role" name="role" defaultValue={item.role} />
        <RowField
          label="Organization"
          name="organization"
          defaultValue={item.organization}
        />
        <RowField label="Location" name="location" defaultValue={item.location} />
        <RowField
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={String(item.sortOrder)}
        />
        <RowField label="Start date" name="startDate" defaultValue={item.startDate} />
        <RowField label="End date" name="endDate" defaultValue={item.endDate} />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs uppercase tracking-[0.15em]">Description</Label>
        <Textarea
          name="description"
          rows={3}
          defaultValue={item.description}
          className="rounded-none border-border"
        />
      </div>
      <div className="flex items-center justify-between">
        <Button
          type="submit"
          disabled={isPending}
          size="sm"
          className="rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          Save
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleDelete}
          className="rounded-none text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

function NewExperienceRow({
  category,
  label,
}: {
  category: 'research' | 'work'
  label: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await createExperience(formData)
      toast.success('Entry added')
      e.currentTarget.reset()
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-dashed border-border p-5"
    >
      <input type="hidden" name="category" value={category} />
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Add {label.toLowerCase()}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <RowField label="Role" name="role" />
        <RowField label="Organization" name="organization" />
        <RowField label="Location" name="location" />
        <RowField label="Sort order" name="sortOrder" type="number" defaultValue="0" />
        <RowField label="Start date" name="startDate" placeholder="e.g. 2023" />
        <RowField label="End date" name="endDate" placeholder="e.g. Present" />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs uppercase tracking-[0.15em]">Description</Label>
        <Textarea name="description" rows={3} className="rounded-none border-border" />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        size="sm"
        className="w-fit rounded-none bg-foreground text-background hover:bg-foreground/90"
      >
        <Plus className="mr-1 h-4 w-4" />
        Add entry
      </Button>
    </form>
  )
}

function RowField({
  label,
  name,
  defaultValue,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  defaultValue?: string
  type?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-[0.15em]">{label}</Label>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-none border-border"
      />
    </div>
  )
}
