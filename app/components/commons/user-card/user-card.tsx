import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

import { getDownloadURLFromPath } from '@/app/lib/firebase'
import { formatUrl } from '@/app/lib/utils'
import { ProfileData } from '@/app/server/get-profile-data'

import { Button } from '../../ui/button'
import { AddCustomLink } from './add-custom-link'
import { EditSocialLinks } from './edit-social-links'
import { EditUserCard } from './edit-user-card'

export async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData
  isOwner: boolean
}) {
  return (
    <div className="flex w-[388px] flex-col items-center gap-5 rounded-3xl border border-white/10 bg-[#121212] p-5 text-white">
      <div className="size-48">
        <img
          src={
            (await getDownloadURLFromPath(profileData?.imagePath)) || '/me.webp'
          }
          alt="Pedro Santos"
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 overflow-hidden text-3xl font-bold">
            {profileData?.name || 'Usuário Dev'}
          </h3>

          {isOwner && <EditUserCard profileData={profileData} />}
        </div>

        <p className="opacity-40">
          {profileData?.description || 'Eu faço produtos para Internet'}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>

        <div className="flex gap-3">
          {profileData?.socialMedias?.github ? (
            <Link
              href={profileData?.socialMedias?.github}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Github />
            </Link>
          ) : (
            <div className="border-border-secondary flex size-12 items-center justify-center rounded-xl border border-dashed">
              <Github className="text-border-secondary" />
            </div>
          )}

          {profileData?.socialMedias?.instagram ? (
            <Link
              href={profileData?.socialMedias?.instagram}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Instagram />
            </Link>
          ) : (
            <div className="border-border-secondary flex size-12 items-center justify-center rounded-xl border border-dashed">
              <Instagram className="text-border-secondary" />
            </div>
          )}

          {profileData?.socialMedias?.linkedin ? (
            <Link
              href={profileData?.socialMedias?.linkedin}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Linkedin />
            </Link>
          ) : (
            <div className="border-border-secondary flex size-12 items-center justify-center rounded-xl border border-dashed">
              <Linkedin className="text-border-secondary" />
            </div>
          )}

          {profileData?.socialMedias?.twitter ? (
            <Link
              href={profileData?.socialMedias?.twitter}
              target="_blank"
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Twitter />
            </Link>
          ) : (
            <div className="border-border-secondary flex size-12 items-center justify-center rounded-xl border border-dashed">
              <Twitter className="text-border-secondary" />
            </div>
          )}

          {isOwner && (
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
      </div>

      <div className="flex min-h-[172px] w-full flex-col gap-3">
        <div className="flex w-full flex-col items-center gap-3">
          {profileData?.link1 && (
            <Link
              href={formatUrl(profileData.link1.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link1.title}</Button>
            </Link>
          )}

          {profileData?.link2 && (
            <Link
              href={formatUrl(profileData.link2.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link2.title}</Button>
            </Link>
          )}

          {profileData?.link3 && (
            <Link
              href={formatUrl(profileData.link3.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link3.title}</Button>
            </Link>
          )}

          {isOwner && <AddCustomLink />}
        </div>
      </div>
    </div>
  )
}
