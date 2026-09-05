'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { createAward, updateAward, deleteAward } from '@/app/admin/actions/awards'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface AwardItem {
  id: number
  title: string
  issuer: string
  year: string
  description: string
  sortOrder: number
}

export function AwardsEditor({ items }: { items: AwardItem[] }) {
  return (
    <div className="flex flex-col gap-10">
      {items.map((item) => (
        <AwardRow key={item.id} item={item} />
      ))}
      <NewAwardRow />
    </div>
  )
}

function AwardRow({ item }: { item: AwardItem }) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateAward(item.id, formData)
      toast.success('Award updated')
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteAward(item.id)
      toast.success('Award removed')
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-border p-5"
    >
      <RowField label="Title" name="title" defaultValue={item.title} />
      <div className="grid gap-4 sm:grid-cols-3">
        <RowField label="Issuer" name="issuer" defaultValue={item.issuer} />
        <RowField label="Year" name="year" defaultValue={item.year} />
        <RowField
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={String(item.sortOrder)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs uppercase tracking-[0.15em]">Description</Label>
        <Textarea
          name="description"
          rows={2}
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

function NewAwardRow() {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await createAward(formData)
      toast.success('Award added')
      e.currentTarget.reset()
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-dashed border-border p-5"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Add certificate / award
      </p>
      <RowField label="Title" name="title" />
      <div className="grid gap-4 sm:grid-cols-3">
        <RowField label="Issuer" name="issuer" />
        <RowField label="Year" name="year" />
        <RowField label="Sort order" name="sortOrder" type="number" defaultValue="0" />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs uppercase tracking-[0.15em]">Description</Label>
        <Textarea name="description" rows={2} className="rounded-none border-border" />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        size="sm"
        className="w-fit rounded-none bg-foreground text-background hover:bg-foreground/90"
      >
        <Plus className="mr-1 h-4 w-4" />
        Add award
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
