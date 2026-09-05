import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getAllContent } from '@/lib/content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileEditor } from '@/components/admin/profile-editor'
import { ExperienceEditor } from '@/components/admin/experience-editor'
import { PublicationsEditor } from '@/components/admin/publications-editor'
import { EducationEditor } from '@/components/admin/education-editor'
import { AwardsEditor } from '@/components/admin/awards-editor'

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/admin/login')

  const { profile, experience, publications, education, awards } =
    await getAllContent()

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Content management
      </p>
      <h1 className="mb-10 font-serif text-3xl text-foreground">
        Edit your portfolio
      </h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-10 h-auto flex-wrap justify-start gap-1 rounded-none bg-transparent p-0">
          <TabsTrigger
            value="profile"
            className="rounded-none border border-border data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="research"
            className="rounded-none border border-border data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Research
          </TabsTrigger>
          <TabsTrigger
            value="work"
            className="rounded-none border border-border data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Work
          </TabsTrigger>
          <TabsTrigger
            value="publications"
            className="rounded-none border border-border data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Publications
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="rounded-none border border-border data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            value="awards"
            className="rounded-none border border-border data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Awards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileEditor profile={profile} />
        </TabsContent>
        <TabsContent value="research">
          <ExperienceEditor items={experience} category="research" label="research experience" />
        </TabsContent>
        <TabsContent value="work">
          <ExperienceEditor items={experience} category="work" label="work experience" />
        </TabsContent>
        <TabsContent value="publications">
          <PublicationsEditor items={publications} />
        </TabsContent>
        <TabsContent value="education">
          <EducationEditor items={education} />
        </TabsContent>
        <TabsContent value="awards">
          <AwardsEditor items={awards} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
