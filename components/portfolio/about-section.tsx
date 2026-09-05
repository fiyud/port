import { SectionHeading } from '@/components/portfolio/section-heading'

export function AboutSection({ bio }: { bio: string }) {
  const paragraphs = bio.split('\n').filter((p) => p.trim().length > 0)

  return (
    <section id="about" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="01 — Profile" title="About" />
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Biography
          </div>
          <div className="flex flex-col gap-6">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-pretty text-lg leading-relaxed text-foreground/90 md:text-xl"
                >
                  {p}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed text-muted-foreground">
                Add a biography from the admin dashboard to introduce yourself here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
