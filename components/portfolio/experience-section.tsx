import { SectionHeading } from '@/components/portfolio/section-heading'

interface ExperienceItem {
  id: number
  role: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceSectionProps {
  id: string
  index: string
  title: string
  description?: string
  items: ExperienceItem[]
  emptyLabel: string
}

export function ExperienceSection({
  id,
  index,
  title,
  description,
  items,
  emptyLabel,
}: ExperienceSectionProps) {
  return (
    <section id={id} className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index={index} title={title} description={description} />

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          <ol className="flex flex-col">
            {items.map((item, i) => (
              <li
                key={item.id}
                className="group grid gap-3 border-t border-border py-8 first:border-t md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {item.startDate}
                  {item.endDate ? ` — ${item.endDate}` : ''}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-foreground md:text-2xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.organization}
                    {item.location ? ` · ${item.location}` : ''}
                  </p>
                  {item.description && (
                    <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/80 md:text-base">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="hidden text-xs text-muted-foreground md:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
