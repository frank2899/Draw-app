import { useEffect, useRef, useState } from 'react'
import { useEditor } from '../states/canvas/hook'
import { setHistoryInterface } from '../states/canvas/types'

const useDraw = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const isDrawingRef = useRef<boolean>(false)
    const prevPointRef = useRef<{ x: number; y: number } | null>(null)

    const {
        color,
        pencilWidth,
        history,
        editorCanvas,
        historyIndex,
        setColor,
        addHistory,
        undo: undoHook,
        setPencilWidth,
        setCanvas,
        setHistoryIndex,
        clearCanvasHistory,
    } = useEditor()

    const clearCanvas = () => {
        if (editorCanvas) {
            const ctx = editorCanvas.getContext('2d')
            if (!ctx) return

            ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height)
            clearCanvasHistory()
        }
    }

    const drawLine = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        ctx: CanvasRenderingContext2D | null,
    ) => {
        if (!ctx || !start || !end) return

        start = start ?? end
        ctx.beginPath()
        ctx.lineWidth = pencilWidth
        ctx.strokeStyle = color
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.imageSmoothingEnabled = true
        // ctx.moveTo(start.x, start.y)
        // ctx.lineTo(end.x, end.y)
        // ctx.stroke()

        if (start.x === end.x && start.y === end.y) {
            // Draw a dot
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
            ctx.fill()
        } else {
            // Draw a line
            ctx.moveTo(start.x, start.y)
            // ctx.lineTo(end.x, end.y)
            ctx.quadraticCurveTo(
                start.x + (end.x - start.x) / 2, // Control point x-coordinate
                start.y + (end.y - start.y) / 2, // Control point y-coordinate
                end.x,
                end.y, // Destination point
            )
            ctx.stroke()
        }
    }

    const undo = () => {
        if (history.length > 0) {
            const ctx = editorCanvas?.getContext('2d')
            if (!ctx) return

            ctx.clearRect(0, 0, editorCanvas!.width, editorCanvas!.height)

            if (!historyIndex) return
            undoHook()
            setHistoryIndex(setHistoryInterface.DECREMENT)

            ctx.putImageData(history[historyIndex], 0, 0)
        }
    }

    const computePointInCanvas = (
        clientX: number,
        clientY: number,
    ): { x: number; y: number } | null => {
        if (!canvasRef?.current) return null

        const boundingRect = canvasRef.current.getBoundingClientRect()
        return {
            x: clientX - boundingRect.left,
            y: clientY - boundingRect.top,
        }
    }

    const onMouseMove: any = (e: any) => {
        if (isDrawingRef.current && canvasRef.current) {
            const point = computePointInCanvas(e.clientX, e.clientY)
            const ctx = canvasRef.current.getContext('2d')
            drawLine(point!, prevPointRef.current!, ctx)
            prevPointRef.current = point
        }
    }

    const onMouseUp: any = (e: any) => {
        isDrawingRef.current = false
        prevPointRef.current = null

        const canvas = canvasRef.current

        if (!canvas || e.type !== 'mouseup') return
        addHistory(
            canvas
                .getContext('2d')
                ?.getImageData(0, 0, canvas.width, canvas.height) as ImageData,
        )
        setHistoryIndex(setHistoryInterface.INCREMENT)
    }

    const onMouseDown = (e: MouseEvent) => {
        isDrawingRef.current = true

        if (isDrawingRef.current && canvasRef.current) {
            const point = computePointInCanvas(e.clientX, e.clientY)
            const ctx = canvasRef.current.getContext('2d')

            if (point && prevPointRef.current) {
                drawLine(point, prevPointRef.current, ctx)
            } else if (point) {
                drawLine(point, point, ctx) // Draw a dot
            }

            prevPointRef.current = point
        }
    }

    const resizeCanvas: any = () => {
        if (!canvasRef.current) return
        const { width, height } = canvasRef.current.getBoundingClientRect()
        const ctx: CanvasRenderingContext2D | null =
            canvasRef.current.getContext('2d')

        const scale = window.devicePixelRatio

        canvasRef.current.width = width * scale
        canvasRef.current.height = height * scale
        ctx?.scale(scale, scale)
    }

    const initListeners = () => {
        if (!canvasRef.current) return

        canvasRef.current.addEventListener('mouseup', onMouseUp)
        canvasRef.current.addEventListener('mousemove', onMouseMove)
        canvasRef.current.addEventListener('mousedown', onMouseDown)
        canvasRef.current.addEventListener('mouseout', onMouseUp)
        window.addEventListener('resize', resizeCanvas)
    }

    const cleanup = () => {
        if (!canvasRef.current) return

        canvasRef.current.removeEventListener('mousemove', onMouseMove)
        canvasRef.current.removeEventListener('mouseup', onMouseUp)
        canvasRef.current.removeEventListener('mouseout', onMouseUp)
        canvasRef.current.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('resize', resizeCanvas)
    }

    useEffect(() => {
        if (canvasRef.current) {
            setCanvas(canvasRef.current)
            resizeCanvas()
        }
    }, [canvasRef.current])

    useEffect(() => {
        if (canvasRef.current) {
            initListeners()
            return cleanup
        }
    }, [canvasRef.current, color, pencilWidth])

    return {
        // REFS
        canvasRef,
        isDrawingRef,

        // SETTER AND GETTER
        pencilWidth,
        setPencilWidth,
        color,
        setColor,

        // FUNCTIONS
        clearCanvas,
        undo,
    }
}

export default useDraw
