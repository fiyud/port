import { DecryptedText } from '@/components/effects/decrypted-text'
import { Mail, GraduationCap } from 'lucide-react'

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.78 1.06.78 2.15 0 1.55-.02 2.8-.02 3.18 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM3.56 20.45h3.56V9H3.56v11.45Z" />
    </svg>
  )
}

interface ContactSectionProps {
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  scholar: string
  fullName: string
}

export function ContactSection({
  email,
  phone,
  location,
  linkedin,
  github,
  scholar,
  fullName,
}: ContactSectionProps) {
  const links = [
    email && { label: email, href: `mailto:${email}`, icon: Mail },
    linkedin && { label: 'LinkedIn', href: linkedin, icon: LinkedinIcon },
    github && { label: 'GitHub', href: github, icon: GithubIcon },
    scholar && { label: 'Google Scholar', href: scholar, icon: GraduationCap },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Mail }[]

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          06 — Contact
        </p>
        <DecryptedText
          text="Let's work together"
          as="h2"
          speed={22}
          className="text-balance font-serif text-4xl leading-tight text-foreground md:text-6xl"
        />
        {location && (
          <p className="mt-6 text-sm text-muted-foreground">{location}</p>
        )}
        {phone && <p className="mt-1 text-sm text-muted-foreground">{phone}</p>}

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-foreground"
            >
              <link.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span className="underline-offset-4 group-hover:underline">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 flex max-w-6xl flex-col gap-2 border-t border-border px-6 pt-8 text-xs uppercase tracking-[0.15em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <span>
          © {new Date().getFullYear()} {fullName}
        </span>
        <span>Designed &amp; built in black and white</span>
      </div>
    </section>
  )
}
