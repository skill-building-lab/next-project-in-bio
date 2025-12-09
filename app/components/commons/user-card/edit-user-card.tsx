'use client'

import { ArrowUpFromLine, UserPen } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { saveProfile } from '@/app/actions/save-profile'
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from '@/app/lib/utils'
import { ProfileData } from '@/app/server/get-profile-data'

import { Button } from '../../ui/button'
import { Modal } from '../../ui/modal'
import { TextArea } from '../../ui/text-area'
import { TextInput } from '../../ui/text-input'

export function EditUserCard({ profileData }: { profileData?: ProfileData }) {
  const router = useRouter()
  const { profileId } = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [yourName, setYourName] = useState(profileData?.name || '')
  const [yourDescription, setYourDescription] = useState(
    profileData?.description || '',
  )

  async function handleSaveProfile() {
    setIsSavingProfile(true)

    const imageInput = document.getElementById(
      'profile-pic-input',
    ) as HTMLInputElement

    if (!imageInput.files) return
    if (!profileId) return

    const compressedFile = await compressFiles(Array.from(imageInput.files))

    const formData = new FormData()
    formData.append('profileId', profileId as string)
    formData.append('profilePic', compressedFile[0])
    formData.append('yourName', yourName)
    formData.append('yourDescription', yourDescription)

    await saveProfile(formData)

    startTransition(() => {
      setIsOpen(false)
      setIsSavingProfile(false)
      router.refresh()
    })
  }

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <UserPen />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary flex w-[514px] flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="gap-4 font-bold text-white">Editar perfil</p>

          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="bg-background-tertiary h-[100px] w-[100px] overflow-hidden rounded-xl">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile Picture"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="h-full w-full cursor-pointer"
                    onClick={() => triggerImageInput('profile-pic-input')}
                  >
                    100x100
                  </button>
                )}
              </div>

              <button
                className="flex cursor-pointer items-center gap-2 text-white"
                onClick={() => triggerImageInput('profile-pic-input')}
              >
                <ArrowUpFromLine className="size-4" />

                <span>Adicionar foto</span>
              </button>

              <input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => setProfilePic(handleImageInput(event))}
              />
            </div>
            <div className="flex w-[293px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="font-bold text-white">
                  Seu nome
                </label>

                <TextInput
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={(event) => setYourName(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="your-description"
                  className="font-bold text-white"
                >
                  Descrição
                </label>

                <TextArea
                  id="your-description"
                  placeholder="Fale um pouco sobre você"
                  className="h-36"
                  value={yourDescription}
                  onChange={(event) => setYourDescription(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="cursor-pointer font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
