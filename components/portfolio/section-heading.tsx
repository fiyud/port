import { DecryptedText } from '@/components/effects/decrypted-text'

interface SectionHeadingProps {
  index: string
  title: string
  description?: string
}

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {index}
        </p>
        <DecryptedText
          text={title}
          as="h2"
          speed={22}
          className="font-serif text-4xl leading-tight text-foreground md:text-5xl"
        />
      </div>
      {description && (
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
