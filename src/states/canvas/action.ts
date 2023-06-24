import { createAction } from '@reduxjs/toolkit'

export const setColor = createAction<string>('canvas/setColor')
export const setPencilWidth = createAction<string>('canvas/setPencilWidth')
export const setHistoryIndex = createAction<string>('canvas/setHistoryIndex')

export const undo = createAction('canvas/undo')
export const clearCanvasHistory = createAction('canvas/clearCanvasHistory')

export const addHistory = createAction<ImageData>('canvas/addHistory')

export const setCanvas = createAction<HTMLCanvasElement | null>(
    'canvas/setCanvas',
)
