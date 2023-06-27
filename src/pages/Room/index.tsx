import { Box, Flex } from '../../components'
import DrawingPad from './components/canvas/DrawingPad'
import ChatBox from './components/Chatbox'
import PlayerList from './components/Players'

const Room = () => {
    return (
        <Box width="100%" maxWidth="1200px" margin="auto">
            <Flex gap="1rem">
                <PlayerList />
                <DrawingPad />
                <Box>
                    <ChatBox />
                </Box>
            </Flex>
        </Box>
    )
}

export default Room
