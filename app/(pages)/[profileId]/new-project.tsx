'use client'

import { ArrowUpFromLine, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createProject } from '@/app/actions/create-project'
import { Button } from '@/app/components/ui/button'
import { Modal } from '@/app/components/ui/modal'
import { TextArea } from '@/app/components/ui/text-area'
import { TextInput } from '@/app/components/ui/text-input'
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from '@/app/lib/utils'

export function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [projectImage, setProjectImage] = useState<string | null>()

  async function handleCreateProject() {
    setIsCreatingProject(true)

    const imageInput = document.getElementById('imageInput') as HTMLInputElement

    if (!imageInput.files) return

    const compressedFiles = await compressFiles(Array.from(imageInput.files))

    const formData = new FormData()
    formData.append('file', compressedFiles[0])
    formData.append('profileId', profileId)
    formData.append('projectName', projectName)
    formData.append('projectDescriptiom', projectDescription)
    formData.append('projectUrl', projectUrl)

    await createProject(formData)

    startTransition(() => {
      setIsOpen(false)
      setIsCreatingProject(false)
      setProjectName('')
      setProjectDescription('')
      setProjectUrl('')
      setProjectImage(null)
      router.refresh()
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-background-secondary border-border-secondary flex h-[132px] w-[340px] cursor-pointer items-center justify-center gap-2 rounded-[20px] hover:border hover:border-dashed"
      >
        <Plus className="text-accent-green size-10" />
        <span>Novo projeto</span>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary flex flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="text-white">Novo projeto</p>

          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="bg-background-tertiary h-[100px] w-[100px] overflow-hidden rounded-xl">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Project Image"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="h-full w-full cursor-pointer"
                    onClick={() => triggerImageInput('imageInput')}
                  >
                    100x100
                  </button>
                )}
              </div>

              <button
                className="flex cursor-pointer items-center gap-2 text-white"
                onClick={() => triggerImageInput('imageInput')}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(event) => setProjectImage(handleImageInput(event))}
              />
            </div>

            <div className="flex w-[293px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="font-bold text-white">
                  Título do projeto
                </label>

                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="font-bold text-white"
                >
                  Descrição
                </label>

                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                  value={projectDescription}
                  onChange={(event) =>
                    setProjectDescription(event.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="font-bold text-white">
                  URL do projeto
                </label>

                <TextInput
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(event) => setProjectUrl(event.target.value)}
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

            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
