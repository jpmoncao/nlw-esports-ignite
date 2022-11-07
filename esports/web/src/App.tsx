import axios from 'axios'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdModal } from './components/CreateAdModal'

export interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  },
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo do NLW eSports" />

      <h1 className='text-white text-6xl font-black mt-20'>
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16 ">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>

  )
}
// 11:00  
export default App
