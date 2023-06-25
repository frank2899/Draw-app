import { createReducer } from '@reduxjs/toolkit'
import { PlayerInterface } from './types'
import { setPlayer, setRoomId, setRoomPlayers } from './action'

interface ListState {
    playerId: string
    playerName: string
    room: {
        players: PlayerInterface[]
        roomId: string
    }
}

const initialState: ListState = {
    playerId: '123',
    playerName: 'Frank Player',
    room: {
        players: [],
        roomId: '',
    },
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setPlayer, (state, { payload: { playerId, playerName } }) => {
            state.playerId = playerId
            state.playerName = playerName
        })
        .addCase(setRoomId, (state, { payload: roomId }) => {
            state.room.roomId = roomId
        })
        .addCase(setRoomPlayers, (state, { payload: playerList }) => {
            state.room.players = playerList
        })
})
