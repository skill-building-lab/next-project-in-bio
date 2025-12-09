import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ProjectCard } from '@/app/components/commons/project-card'
import { TotalVisits } from '@/app/components/commons/total-visits'
import { UserCard } from '@/app/components/commons/user-card/user-card'
import { auth } from '@/app/lib/auth'
import { getDownloadURLFromPath } from '@/app/lib/firebase'
import {
  getProfileData,
  getProfileProjects,
} from '@/app/server/get-profile-data'

import { NewProject } from './new-project'

export default async function Profile({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  const { profileId } = await params

  const profileData = await getProfileData(profileId)

  if (!profileData) return notFound()

  const projects = await getProfileProjects(profileId)

  const session = await auth()

  const isOwner = profileData.userId === session?.user?.id

  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      <div className="bg-background-tertiary fixed top-0 left-0 flex w-full items-center justify-center gap-1 py-2">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green cursor-pointer font-bold">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>

      <div className="flex h-min w-1/2 justify-center">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>

      <div className="justify-centerm flex w-full flex-wrap content-start gap-4 overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadURLFromPath(project.imagePath)) || ''}
          />
        ))}

        {isOwner && <NewProject profileId={profileId} />}
      </div>

      <div className="absolute right-0 bottom-4 left-0 mx-auto w-min">
        <TotalVisits />
      </div>
    </div>
  )
}
