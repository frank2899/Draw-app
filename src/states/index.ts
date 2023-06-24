import { configureStore } from '@reduxjs/toolkit'
import canvas from './canvas/reducer'

const store = configureStore({
    reducer: {
        canvas,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export default store
