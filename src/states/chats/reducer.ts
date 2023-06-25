import { createReducer } from '@reduxjs/toolkit'

import { addChat } from './action'
import { IChat } from './types'

export interface ListsState {
    chats: IChat[]
}

const initialState: ListsState = {
    chats: [
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Test Bueno',
        },
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Frank Bueno',
        },
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Anna Bueno',
        },
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Frank Bueno',
        },
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Anna Bueno',
        },
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Test Bueno',
        },
        {
            message: 'Hello world',
            isCorrect: false,
            playerId: '01',
            playerName: 'Frank Bueno',
        },
    ],
}

export default createReducer(initialState, (builder) =>
    builder.addCase(
        addChat,
        (state, { payload: { message, isCorrect, playerId, playerName } }) => {
            state.chats.push({ message, isCorrect, playerId, playerName })
        },
    ),
)
