import { useEffect, useRef } from "react"
import { Box, Flex } from "../../../../components"
import { styled } from "styled-components"

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
    padding:10px;
    width:200px
`

const EditorContent = styled(Flex)`
    position:absolute;
    top:100%;
    left:0;
    background-color: #e1e1e1;
    width:200px;
    border-radius: 0 0 0.5rem 0.5rem;
`

const CanvasEditor = () => {
    const editorContainer = useRef<HTMLDivElement>(null)
    const isClicked = useRef<boolean>(false)
    const coords = useRef<CoordsTypes>({ x: 0, y: 0, prevX: 0, prevY: 0 })

    const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return

        isClicked.current = true
        coords.current = { ...coords.current, x: e.clientX, y: e.clientY }

        if (editorContainer.current) editorContainer.current.style.cursor = 'grabbing'
    }

    const onMouseUp = () => {        
        isClicked.current = false

        if (!editorContainer.current) return
        coords.current = {
            ...coords.current,
            prevX: editorContainer.current.offsetLeft,
            prevY: editorContainer.current.offsetTop,
        }

        if (editorContainer.current) editorContainer.current.style.cursor = 'grab'
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!isClicked.current) return

        const moveToX = e.clientX - coords.current.x + coords.current.prevX
        const moveToY = e.clientY - coords.current.y + coords.current.prevY

        if (!editorContainer.current) return

        editorContainer.current.style.top = `${moveToY}px`
        editorContainer.current.style.left = `${moveToX}px`
    }

    const initListeners = () => {
        if (!editorContainer.current) return

        editorContainer.current.addEventListener("mouseup", onMouseUp)
        editorContainer.current.addEventListener("mousedown", onMouseDown)

        window.addEventListener("mousemove", onMouseMove)
    }

    const cleanUp = () => {
        if (!editorContainer.current) return

        editorContainer.current.removeEventListener("mouseup", onMouseUp)
        editorContainer.current.removeEventListener("mousedown", onMouseDown)

        window.removeEventListener("mousemove", onMouseMove)
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
                <input type="range"/>
                <input type="color"/>
                <button>clear</button>
            </EditorContent>
        </EditorContaner>
    )
}

export default CanvasEditor
