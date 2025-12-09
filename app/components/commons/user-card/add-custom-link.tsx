'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { addCustomLinks } from '@/app/actions/add-custom-links'

import { Button } from '../../ui/button'
import { Modal } from '../../ui/modal'
import { TextInput } from '../../ui/text-input'

export function AddCustomLink() {
  const router = useRouter()
  const { profileId } = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isSavingCustomLinks, setIsSavingCustomLinks] = useState(false)

  const [link1, setLink1] = useState({
    title: '',
    url: '',
  })
  const [link2, setLink2] = useState({
    title: '',
    url: '',
  })
  const [link3, setLink3] = useState({
    title: '',
    url: '',
  })

  async function handleSaveCustomLinks() {
    setIsSavingCustomLinks(true)

    if (!profileId) return

    await addCustomLinks({
      profileId: profileId as string,
      link1,
      link2,
      link3,
    })

    startTransition(() => {
      setIsOpen(false)
      setIsSavingCustomLinks(false)
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
          <p className="gap-4 font-bold text-white">
            Adicionar links personalizados
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <p>Título do link</p>
                <TextInput
                  placeholder="Digite o título"
                  value={link1.title}
                  onChange={(event) =>
                    setLink1((state) => ({
                      ...state,
                      title: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex w-full flex-col">
                <p className="font-bold">Link</p>
                <TextInput
                  placeholder="Inserir URL"
                  value={link1.url}
                  onChange={(event) =>
                    setLink1((state) => ({
                      ...state,
                      url: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <p>Título do link</p>
                <TextInput
                  placeholder="Digite o título"
                  value={link2.title}
                  onChange={(event) =>
                    setLink2((state) => ({
                      ...state,
                      title: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex w-full flex-col">
                <p className="font-bold">Link</p>
                <TextInput
                  placeholder="Inserir URL"
                  value={link2.url}
                  onChange={(event) =>
                    setLink2((state) => ({
                      ...state,
                      url: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <p>Título do link</p>
                <TextInput
                  placeholder="Digite o título"
                  value={link3.title}
                  onChange={(event) =>
                    setLink3((state) => ({
                      ...state,
                      title: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex w-full flex-col">
                <p className="font-bold">Link</p>
                <TextInput
                  placeholder="Inserir URL"
                  value={link3.url}
                  onChange={(event) =>
                    setLink3((state) => ({
                      ...state,
                      url: event.target.value,
                    }))
                  }
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
            <Button
              onClick={handleSaveCustomLinks}
              disabled={isSavingCustomLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
