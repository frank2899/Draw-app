import { styled } from "styled-components"
import useDraw from "../../../../hooks/useDraw";
import { Flex } from "../../../../components";
import CanvasEditor from "./CanvasEditor";

const StyledCanvas = styled.canvas`
  border: 1px solid black;
  border-radius : .5rem;
  height:700px;
  background-color: white;
  -webkit-box-shadow: 0 10px 6px -6px #777;
     -moz-box-shadow: 0 10px 6px -6px #777;
          box-shadow: 0 10px 6px -6px #777;
`

const DrawingPad: React.FC = () => {

  const { canvasRef } = useDraw()

  return (
    <Flex flexDirection="column" gap=".5rem" position="relative">
      <StyledCanvas
        ref={canvasRef}
      />
      <CanvasEditor/>
    </Flex>
  )
}

export default DrawingPad
