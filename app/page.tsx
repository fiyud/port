import { getAllContent } from '@/lib/content'
import { SiteNav } from '@/components/portfolio/site-nav'
import { HeroSection } from '@/components/portfolio/hero-section'
import { AboutSection } from '@/components/portfolio/about-section'
import { ExperienceSection } from '@/components/portfolio/experience-section'
import { PublicationsSection } from '@/components/portfolio/publications-section'
import { EducationSection } from '@/components/portfolio/education-section'
import { ContactSection } from '@/components/portfolio/contact-section'

export default async function Page() {
  const { profile, experience, publications, education, awards } =
    await getAllContent()

  const fullName = profile?.fullName || 'Your Name'
  const title = profile?.title || 'AI Researcher & Engineer'
  const tagline =
    profile?.tagline ||
    'Add a tagline from the admin dashboard to introduce your work.'

  const research = experience.filter((e) => e.category === 'research')
  const work = experience.filter((e) => e.category === 'work')

  return (
    <main className="relative">
      <SiteNav name={fullName} />
      <HeroSection fullName={fullName} title={title} tagline={tagline} />
      <AboutSection bio={profile?.bio || ''} />
      <ExperienceSection
        id="research"
        index="02 — Labs"
        title="Research Experience"
        description="Selected research roles across AI, data science, and biomedical machine learning."
        items={research}
        emptyLabel="Research experience will appear here once added."
      />
      <ExperienceSection
        id="work"
        index="03 — Industry"
        title="Work Experience"
        description="Professional roles applying machine learning to real-world products."
        items={work}
        emptyLabel="Work experience will appear here once added."
      />
      <PublicationsSection items={publications} />
      <EducationSection education={education} awards={awards} />
      <ContactSection
        email={profile?.email || ''}
        phone={profile?.phone || ''}
        location={profile?.location || ''}
        linkedin={profile?.linkedin || ''}
        github={profile?.github || ''}
        scholar={profile?.scholar || ''}
        fullName={fullName}
      />
    </main>
  )
}
