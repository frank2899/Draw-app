import { createReducer } from '@reduxjs/toolkit'

import {
    setColor,
    setPencilWidth,
    undo,
    addHistory,
    setCanvas,
    setHistoryIndex,
    clearCanvasHistory,
} from './action'
import { ListsState, setHistoryInterface } from './types'

const initialState: ListsState = {
    color: '#000000',
    pencilWidth: 5,
    history: [],
    canvas: null,
    historyIndex: 0,
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(setColor, (state, { payload: color }) => {
            state.color = color
        })
        .addCase(setPencilWidth, (state, { payload: pencilWidth }) => {
            state.pencilWidth = Number(pencilWidth)
        })
        .addCase(undo, (state) => {
            state.history = state.history.slice(0, -1)
        })
        .addCase(addHistory, (state, { payload: data }) => {
            state.history.push(data)
        })
        .addCase(setCanvas, (state, { payload: canvas }) => {
            ;(state as ListsState).canvas = canvas
        })
        .addCase(setHistoryIndex, (state, { payload: action }) => {
            if (action === setHistoryInterface.INCREMENT) {
                state.historyIndex = Math.min(
                    state.historyIndex + 1,
                    state.history.length - 1,
                )
            }
            if (action === setHistoryInterface.DECREMENT) {
                state.historyIndex = Math.max(state.historyIndex - 1, 0)
            }
        })
        .addCase(clearCanvasHistory, (state) => {
            state.history = []
            state.historyIndex = 0
        }),
)
