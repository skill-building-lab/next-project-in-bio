import { manageAuth } from '@/app/actions/manage-auth'
import { auth } from '@/app/lib/auth'

import { Button } from '../ui/button'

export async function Header() {
  const session = await auth()

  return (
    <div className="absolute top-0 right-0 left-0 z-50 mx-auto flex max-w-7xl items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="Logo" />

        <h3 className="text-2xl font-bold text-white">ProjectInBio</h3>
      </div>

      <div className="flex items-center gap-4">
        {session && <Button>Minha Página</Button>}

        <form action={manageAuth}>
          <Button>{session ? 'Sair' : 'Login'}</Button>
        </form>
      </div>
    </div>
  )
}
