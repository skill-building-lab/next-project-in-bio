'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { createLink } from '@/app/actions/create-link'
import { verifyLink } from '@/app/actions/verify-link'
import { Button } from '@/app/components/ui/button'
import { TextInput } from '@/app/components/ui/text-input'
import { sanitizeLink } from '@/app/lib/utils'

export function CreateLinkForm() {
  const router = useRouter()

  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  function handleLinkChange(value: string) {
    setLink(sanitizeLink(value))
    setError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (link.length === 0) return setError('Escolha um link primeiro :)')

    const isLinkTaken = await verifyLink(link)

    if (isLinkTaken) return setError('Desculpe, esse link já está em uso :)')

    const isLinkCreated = await createLink(link)

    if (!isLinkCreated)
      return setError('Erro ao criar o link. Tente novamente! :(')

    router.push(`${link}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <span className="text-white">projectinbio.com</span>

        <TextInput
          value={link}
          onChange={(event) => handleLinkChange(event.target.value)}
        />

        <Button className="w-[126px]">Criar</Button>
      </form>

      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  )
}
