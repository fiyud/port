import { DotField } from '@/components/effects/dot-field'
import { DecryptedText } from '@/components/effects/decrypted-text'

interface HeroSectionProps {
  fullName: string
  title: string
  tagline: string
}

export function HeroSection({ fullName, title, tagline }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100vh] flex-col justify-between overflow-hidden border-b border-border"
    >
      <DotField />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 md:px-10">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {title}
        </p>
        <DecryptedText
          text={fullName}
          as="h1"
          triggerOnView={false}
          speed={28}
          className="text-balance font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        />
        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {tagline}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-8 text-xs uppercase tracking-[0.15em] text-muted-foreground md:px-10">
        <span>Scroll to explore</span>
        <span className="hidden md:inline">Portfolio — Est. 2026</span>
      </div>
    </section>
  )
}
