import { Box, Flex } from '../../components'
import DrawingPad from './components/canvas/DrawingPad'
import PlayerList from './components/players'

const Room = () => {
    return (
        <Box width="100%" maxWidth="1200px" margin="auto">
            <Flex gap="1rem">
                <PlayerList />
                <DrawingPad />
            </Flex>
        </Box>
    )
}

export default Room
