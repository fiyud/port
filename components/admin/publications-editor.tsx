'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import {
  createPublication,
  updatePublication,
  deletePublication,
} from '@/app/admin/actions/publications'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface PublicationItem {
  id: number
  title: string
  authors: string
  venue: string
  rank: string
  year: string
  link: string
  sortOrder: number
}

export function PublicationsEditor({ items }: { items: PublicationItem[] }) {
  return (
    <div className="flex flex-col gap-10">
      {items.map((item) => (
        <PublicationRow key={item.id} item={item} />
      ))}
      <NewPublicationRow />
    </div>
  )
}

function PublicationRow({ item }: { item: PublicationItem }) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updatePublication(item.id, formData)
      toast.success('Publication updated')
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePublication(item.id)
      toast.success('Publication removed')
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-border p-5"
    >
      <RowField label="Title" name="title" defaultValue={item.title} />
      <RowField label="Authors" name="authors" defaultValue={item.authors} />
      <div className="grid gap-4 sm:grid-cols-2">
        <RowField label="Venue" name="venue" defaultValue={item.venue} />
        <RowField label="Rank (e.g. Q1, A*)" name="rank" defaultValue={item.rank} />
        <RowField label="Year" name="year" defaultValue={item.year} />
        <RowField
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={String(item.sortOrder)}
        />
      </div>
      <RowField label="Link (DOI / URL)" name="link" defaultValue={item.link} />
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

function NewPublicationRow() {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await createPublication(formData)
      toast.success('Publication added')
      e.currentTarget.reset()
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-dashed border-border p-5"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Add publication
      </p>
      <RowField label="Title" name="title" />
      <RowField label="Authors" name="authors" />
      <div className="grid gap-4 sm:grid-cols-2">
        <RowField label="Venue" name="venue" />
        <RowField label="Rank (e.g. Q1, A*)" name="rank" />
        <RowField label="Year" name="year" />
        <RowField label="Sort order" name="sortOrder" type="number" defaultValue="0" />
      </div>
      <RowField label="Link (DOI / URL)" name="link" />
      <Button
        type="submit"
        disabled={isPending}
        size="sm"
        className="w-fit rounded-none bg-foreground text-background hover:bg-foreground/90"
      >
        <Plus className="mr-1 h-4 w-4" />
        Add publication
      </Button>
    </form>
  )
}

function RowField({
  label,
  name,
  defaultValue,
  type = 'text',
}: {
  label: string
  name: string
  defaultValue?: string
  type?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-[0.15em]">{label}</Label>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="rounded-none border-border"
      />
    </div>
  )
}
