'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#research', label: 'Research' },
  { href: '#work', label: 'Work' },
  { href: '#publications', label: 'Publications' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-border' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="#top"
          className="font-serif text-sm tracking-[0.2em] text-foreground"
        >
          {initials || 'Q.A'}
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden text-xs uppercase tracking-[0.15em] text-foreground underline underline-offset-4 md:inline"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
