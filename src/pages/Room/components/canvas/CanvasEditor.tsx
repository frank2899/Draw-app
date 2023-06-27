import { useEffect, useRef } from 'react'
import { Flex, Text } from '../../../../components'
import { styled } from 'styled-components'
import useDraw from '../../../../hooks/useDraw'

interface CoordsTypes {
    x: number
    y: number
    prevX: number
    prevY: number
}

const EditorContaner = styled.div`
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 0 10px 6px -6px #777;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: #c8c8c8;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 100;
    cursor: grab;
    padding: 10px;
    width: 200px;
`

const EditorContent = styled(Flex)`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #e1e1e1;
    width: 200px;
    border-radius: 0 0 0.5rem 0.5rem;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 0 10px 6px -6px #777;
`

const StyledInput = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    border: none;
    overflow: hidden;
    border-radius: 1rem;
    background-color: transparent;
    cursor: pointer;

    ::-webkit-color-swatch {
        border-radius: 15px;
        border: none;
    }

    ::-moz-color-swatch {
        border-radius: 15px;
        border: none;
    }
`

const CanvasEditor = () => {
    const editorContainer = useRef<HTMLDivElement>(null)
    const isClicked = useRef<boolean>(false)
    const coords = useRef<CoordsTypes>({ x: 0, y: 0, prevX: 0, prevY: 0 })
    const { color, pencilWidth, setColor, setPencilWidth, clearCanvas, undo } =
        useDraw()

    const onMouseDown = (e: MouseEvent) => {
        if (
            e.button !== 0 ||
            (editorContainer.current && e.target !== editorContainer.current)
        )
            return

        isClicked.current = true
        coords.current = { ...coords.current, x: e.clientX, y: e.clientY }

        if (editorContainer.current)
            editorContainer.current.style.cursor = 'grabbing'
    }

    const onMouseUp = () => {
        isClicked.current = false

        if (!editorContainer.current) return
        coords.current = {
            ...coords.current,
            prevX: editorContainer.current.offsetLeft,
            prevY: editorContainer.current.offsetTop,
        }

        if (editorContainer.current)
            editorContainer.current.style.cursor = 'grab'
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!isClicked.current || !editorContainer.current) return
        const moveToX = e.clientX - coords.current.x + coords.current.prevX
        const moveToY = e.clientY - coords.current.y + coords.current.prevY

        editorContainer.current.style.top = `${moveToY}px`
        editorContainer.current.style.left = `${moveToX}px`
    }

    const initListeners = () => {
        if (!editorContainer.current) return

        coords.current = {
            ...coords.current,
            prevX: editorContainer.current.offsetLeft,
            prevY: editorContainer.current.offsetTop,
        }

        editorContainer.current.addEventListener('mouseup', onMouseUp)
        editorContainer.current.addEventListener('mousedown', onMouseDown)

        window.addEventListener('mousemove', onMouseMove)
    }

    const cleanUp = () => {
        if (!editorContainer.current) return

        editorContainer.current.removeEventListener('mouseup', onMouseUp)
        editorContainer.current.removeEventListener('mousedown', onMouseDown)

        window.removeEventListener('mousemove', onMouseMove)
    }

    useEffect(() => {
        if (editorContainer.current) {
            initListeners()

            return cleanUp
        }
    }, [])

    return (
        <EditorContaner ref={editorContainer}>
            <EditorContent p="10px" flexDirection="column" gap="10px">
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize=".7rem">Brush color &nbsp;</Text>
                    <StyledInput
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </Flex>
                <input
                    type="range"
                    min="5"
                    max="30"
                    value={pencilWidth}
                    onChange={(e) => setPencilWidth(e.target.value)}
                />
                <button onClick={() => undo()}>Undo</button>
                <button onClick={() => clearCanvas()}>Clear</button>
            </EditorContent>
        </EditorContaner>
    )
}

export default CanvasEditor
