import { createAction } from '@reduxjs/toolkit'
import { PlayerInterface } from './types'

export const setPlayer = createAction<{ playerId: string; playerName: string }>(
    'player/setName',
)

export const setRoomId = createAction<string>('player/setRoomId')

export const setRoomPlayers = createAction<PlayerInterface[]>(
    'player/setRoomPlayers',
)
