import axios from 'axios';
import { useEffect, useState, FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, GameController } from 'phosphor-react'

import { Game } from '../App'

import { Input } from './Form/Input'

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>()

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name) {
            return
        }

        try {
            await axios.post(`http:localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anúncio criado com sucesso!')

        } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio!')
        }

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
                    <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreateAd} className='mt-8'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                            <select
                                name='game' id="game"
                                className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-50 appearance-none   '
                                defaultValue=""
                            >
                                <option disabled value="">Selecione o game que deseja jogar</option>

                                {
                                    games.map(game => {
                                        return (
                                            <option
                                                value={game.id}
                                            >
                                                {game.title}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='name'>Seu nome (ou nickname)</label>
                            <Input name='name' id='name' placeholder='Como te chamam dentro do game' />
                        </div>

                        <div className='grid grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='yearsPlaying'>Joga a quantos anos?</label>
                                <Input type='number' name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='discord'>Qual seu Discord?</label>
                                <Input type='text' name='discord' id='discord' placeholder='Usuario#0000' />
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="weekDays">Quando costuma jogar?</label>
                                <ToggleGroup.Root
                                    className='grid grid-cols-4 gap-2'
                                    type='multiple'
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Domingo'
                                        value='0'
                                    >
                                        D
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Segunda'
                                        value='1'
                                    >
                                        S
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Terça'
                                        value='2'
                                    >
                                        T
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Quarta'
                                        value='3'
                                    >
                                        Q
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Quinta'
                                        value='4'
                                    >
                                        Q
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Sexta'
                                        value='5'
                                    >
                                        S
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Sábado'
                                        value='6'
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>

                            <div className='flex flex-col gap-2 flex-1'>
                                <label htmlFor="hourStart">Qual horário do dia</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Input name='hourStart' id='hourStart' type='time' placeholder='De' />
                                    <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até' />
                                </div>
                            </div>

                        </div>

                        <div className='mt-2 flex items-center gap-2 text-sm'>
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                onCheckedChange={checked => {
                                    if (checked === true) {
                                        setUseVoiceChannel(true)
                                    } else {
                                        setUseVoiceChannel(false)
                                    }
                                }}
                                className='w-6 h-6 rounded bg-zinc-900 p-1'
                            >
                                <Checkbox.Indicator>
                                    <Check className='w-4 h-4 text-emerald-400' />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar no chat de voz
                        </div>

                        <footer className='mt-4 flex justify-end gap-4'>
                            <Dialog.Close
                                className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'>
                                Cancelar
                            </Dialog.Close>
                            <button
                                className='flex items-center gap-3 bg-violet-500 hover:bg-purple-600 px-5 h-12 rounded-md font-semibold'
                                type="submit">
                                <GameController size={24} />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}

