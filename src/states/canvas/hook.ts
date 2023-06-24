import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setColor as setColorAction,
    setPencilWidth as setPencilWidthAction,
    undo as undoAction,
    addHistory as addHistoryAction,
    setCanvas as setCanvasAction,
    setHistoryIndex as setHistoryIndexAction,
    clearCanvasHistory as clearCanvasHistoryAction,
} from './action'
import { AppDispatch, AppState } from '..'

export const useEditor = (): {
    color: string
    pencilWidth: number
    history: ImageData[]
    editorCanvas: any
    historyIndex: number
    setColor: (color: string) => void
    addHistory: (data: ImageData) => void
    undo: () => void
    setPencilWidth: (width: string) => void
    setCanvas: (c: HTMLCanvasElement | null) => void
    setHistoryIndex: (i: string) => void
    clearCanvasHistory: () => void
} => {
    const dispatch = useDispatch<AppDispatch>()

    const color = useSelector<AppState, string>((state) => state.canvas.color)
    const pencilWidth = useSelector<AppState, number>(
        (state) => state.canvas.pencilWidth,
    )
    const history = useSelector<AppState, ImageData[]>(
        (state) => state.canvas.history,
    )
    const historyIndex = useSelector<AppState, number>(
        (state) => state.canvas.historyIndex,
    )
    const editorCanvas = useSelector<AppState, HTMLCanvasElement | null>(
        (state) => state.canvas.canvas,
    )

    const setCanvas = useCallback(
        (canvas: HTMLCanvasElement | null) => {
            dispatch(setCanvasAction(canvas))
        },
        [dispatch],
    )

    const setColor = useCallback(
        (color: string) => {
            dispatch(setColorAction(color))
        },
        [dispatch],
    )

    const setPencilWidth = useCallback(
        (width: string) => {
            dispatch(setPencilWidthAction(width))
        },
        [dispatch],
    )

    const addHistory = useCallback(
        (data: ImageData) => {
            dispatch(addHistoryAction(data))
        },
        [dispatch],
    )

    const undo = useCallback(() => {
        dispatch(undoAction())
    }, [dispatch])

    const setHistoryIndex = useCallback(
        (action: string) => {
            dispatch(setHistoryIndexAction(action))
        },
        [dispatch],
    )

    const clearCanvasHistory = useCallback(() => {
        dispatch(clearCanvasHistoryAction())
    }, [dispatch])

    return {
        color,
        pencilWidth,
        history,
        editorCanvas,
        historyIndex,
        setColor,
        addHistory,
        undo,
        setPencilWidth,
        setCanvas,
        setHistoryIndex,
        clearCanvasHistory,
    }
}
