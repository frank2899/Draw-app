import { configureStore } from '@reduxjs/toolkit'
import canvas from './canvas/reducer'
import chats from './chats/reducer'
import players from './players/reducer'

const store = configureStore({
    reducer: {
        canvas,
        chats,
        players,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export default store
