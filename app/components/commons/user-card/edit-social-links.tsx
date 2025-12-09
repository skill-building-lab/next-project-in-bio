'use client'

import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createSocialLinks } from '@/app/actions/create-social-links'

import { Button } from '../../ui/button'
import { Modal } from '../../ui/modal'
import { TextInput } from '../../ui/text-input'

export function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
}) {
  const router = useRouter()
  const { profileId } = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)

  const [github, setGithub] = useState(socialMedias?.github || '')
  const [instagram, setInstagram] = useState(socialMedias?.instagram || '')
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || '')
  const [twitter, setTwitter] = useState(socialMedias?.twitter || '')

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true)

    if (!profileId) return

    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    })

    startTransition(() => {
      setIsOpen(false)
      setIsSavingSocialLinks(false)
      router.refresh()
    })
  }

  return (
    <>
      <button
        className="cursor-pointer rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
        onClick={() => setIsOpen(true)}
      >
        <Plus />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary flex w-[514px] flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="gap-4 font-bold text-white">Adicionar redes sociais</p>

          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center gap-2">
              <Github />
              <TextInput
                type="text"
                placeholder="Link Github"
                value={github}
                onChange={(event) => setGithub(event.target.value)}
              />
            </div>

            <div className="flex w-full items-center gap-2">
              <Linkedin />
              <TextInput
                type="text"
                placeholder="Link Linkedin"
                value={instagram}
                onChange={(event) => setInstagram(event.target.value)}
              />
            </div>

            <div className="flex w-full items-center gap-2">
              <Instagram />
              <TextInput
                type="text"
                placeholder="Link Instagram"
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
              />
            </div>

            <div className="flex w-full items-center gap-2">
              <Twitter />
              <TextInput
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={(event) => setTwitter(event.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="cursor-pointer font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
