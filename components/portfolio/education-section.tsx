import { SectionHeading } from '@/components/portfolio/section-heading'

interface EducationItem {
  id: number
  institution: string
  degree: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface AwardItem {
  id: number
  title: string
  issuer: string
  year: string
}

interface EducationSectionProps {
  education: EducationItem[]
  awards: AwardItem[]
}

export function EducationSection({ education, awards }: EducationSectionProps) {
  return (
    <section id="education" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="05 — Foundation" title="Education" />

        <div className="grid gap-16 md:grid-cols-2">
          <div className="flex flex-col">
            {education.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Education history will appear here once added.
              </p>
            ) : (
              education.map((ed) => (
                <div key={ed.id} className="border-t border-border py-8 first:border-t">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {ed.startDate}
                    {ed.endDate ? ` — ${ed.endDate}` : ''}
                  </span>
                  <h3 className="mt-2 font-serif text-xl text-foreground md:text-2xl">
                    {ed.institution}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ed.degree}
                    {ed.location ? ` · ${ed.location}` : ''}
                  </p>
                  {ed.description && (
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/80">
                      {ed.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col">
            <p className="border-t border-border pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Certificates &amp; Awards
            </p>
            {awards.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Awards and certificates will appear here once added.
              </p>
            ) : (
              awards.map((award) => (
                <div key={award.id} className="border-t border-border py-6 first:mt-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-balance text-base text-foreground md:text-lg">
                      {award.title}
                    </h4>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {award.year}
                    </span>
                  </div>
                  {award.issuer && (
                    <p className="mt-1 text-sm text-muted-foreground">{award.issuer}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
