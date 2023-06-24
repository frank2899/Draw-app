import { useEffect, useRef, useState } from "react"

const useDraw = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const isDrawingRef = useRef<boolean>(false)
    const prevPointRef = useRef<null | { x: number; y: number }>(null)

    const [color, setColor] = useState<string>('#000000')
    const [pencilWidth, setPencilWidth] = useState<number>(5)

    const clearCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    const drawLine = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        ctx: CanvasRenderingContext2D | null
    ) => {
        if (!ctx || !start || !end) return

        start = start ?? end
        ctx.beginPath()
        ctx.lineWidth = pencilWidth
        ctx.strokeStyle = color
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    const computePointInCanvas = (
        clientX: number,
        clientY: number
    ): { x: number; y: number } | null => {
        if (!canvasRef?.current) return null

        const boundingRect = canvasRef.current.getBoundingClientRect()
        return {
            x: clientX - boundingRect.left,
            y: clientY - boundingRect.top,
        }
    }

    const onMouseMove: any = (
        e: any
    ) => {
        if (isDrawingRef.current && canvasRef.current) {
            const point = computePointInCanvas(e.clientX, e.clientY)
            const ctx = canvasRef.current.getContext('2d')
            drawLine(point!, prevPointRef.current!, ctx)
            prevPointRef.current = point
        }
    }

    const onMouseUp: any = () => {
        isDrawingRef.current = false
        prevPointRef.current = null
    }

    const onMouseDown: any = () => {
        isDrawingRef.current = true
    }

    const resizeCanvas: any = () => {
        if (!canvasRef.current) return
        const { width, height } = canvasRef.current.getBoundingClientRect()
        const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d')

        const scale = window.devicePixelRatio
  
        canvasRef.current.width = width * scale
        canvasRef.current.height = height * scale
        ctx?.scale(scale, scale)
    }

    const initListeners = () => {
        if(!canvasRef.current) return

        canvasRef.current.addEventListener("mouseup", onMouseUp)
        canvasRef.current.addEventListener("mousemove", onMouseMove)
        canvasRef.current.addEventListener("mousedown", onMouseDown)
        canvasRef.current.addEventListener("mouseout", onMouseUp)
        window.addEventListener('resize', resizeCanvas)
    }

    const cleanup = () => {
        if(!canvasRef.current) return

        canvasRef.current.removeEventListener("mousemove", onMouseMove)
        canvasRef.current.removeEventListener("mouseup", onMouseUp)
        canvasRef.current.removeEventListener("mouseout", onMouseUp)
        canvasRef.current.removeEventListener("mousedown", onMouseDown)
        window.removeEventListener("resize", resizeCanvas)
    }
    
    useEffect(() => {
        if (canvasRef.current) {
            resizeCanvas()
            initListeners()

            return cleanup
        }
    }, [canvasRef.current])

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
        clearCanvas
    }
}

export default useDraw