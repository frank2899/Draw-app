import { styled } from 'styled-components'
import useDraw from '../../../../hooks/useDraw'
import { Box, Flex, Text } from '../../../../components'
import CanvasEditor from './CanvasEditor'

const StyledCanvas = styled.canvas`
    width: 100%;
    border: 1px solid black;
    border-radius: 0.5rem;
    height: 700px;
    background-color: white;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 0 10px 6px -6px #777;
`

const DrawingPad: React.FC = () => {
    const { canvasRef } = useDraw()

    return (
        <Flex flexDirection="column" gap=".5rem">
            <Box
                border="1px solid black"
                borderRadius="0.5rem"
                padding="10px"
                background="white"
            >
                <Text
                    width="100%"
                    textAlign="center"
                    fontSize="2rem"
                    fontWeight="bolder"
                >
                    Chocolate hills
                </Text>
            </Box>

            <Box position="relative">
                <StyledCanvas ref={canvasRef} />
                <CanvasEditor />
            </Box>

            <Box
                border="1px solid black"
                borderRadius="0.5rem"
                padding=".5rem"
                background="white"
            >
                <input
                    style={{ width: '100%', padding: '.5rem' }}
                    placeholder="Write your guess here..."
                />
            </Box>
        </Flex>
    )
}

export default DrawingPad
