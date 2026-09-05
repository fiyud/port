import { SectionHeading } from '@/components/portfolio/section-heading'
import { ArrowUpRight } from 'lucide-react'

interface PublicationItem {
  id: number
  title: string
  authors: string
  venue: string
  rank: string
  year: string
  link: string
}

export function PublicationsSection({ items }: { items: PublicationItem[] }) {
  return (
    <section id="publications" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="04 — Papers"
          title="Publications"
          description="Peer-reviewed and preprint work across biomedical AI, data science, and applied machine learning."
        />

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Publications added from the admin dashboard will appear here.
          </p>
        ) : (
          <ol className="flex flex-col">
            {items.map((pub) => {
              const content = (
                <>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-balance font-serif text-xl text-foreground md:text-2xl">
                      {pub.title}
                    </h3>
                    {pub.link && (
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{pub.authors}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <span>{pub.venue}</span>
                    {pub.rank && (
                      <span className="rounded-none border border-border px-2 py-0.5">
                        {pub.rank}
                      </span>
                    )}
                    <span>{pub.year}</span>
                  </p>
                </>
              )

              return (
                <li key={pub.id} className="border-t border-border py-8 first:border-t">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group">{content}</div>
                  )}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
