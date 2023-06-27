import { styled } from 'styled-components'
import { Box, Flex, Text } from '../../../components'

const PlayerCard = styled(Box)`
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: white;
    padding: 1rem;
    width: 200px;
`

const PlayerList = () => {
    return (
        <Flex flexDirection="column" gap=".5rem">
            <PlayerCard>
                <Text width="13ch">Frank Player (host)</Text>
            </PlayerCard>
            <PlayerCard>
                <Text width="13ch">Test</Text>
            </PlayerCard>
            <PlayerCard>
                <Text width="13ch">123</Text>
            </PlayerCard>
            <PlayerCard>
                <Text width="13ch">Player</Text>
            </PlayerCard>
            <PlayerCard>
                <Text width="13ch">deaswdsad</Text>
            </PlayerCard>
            <PlayerCard>
                <Text width="13ch">frankyy</Text>
            </PlayerCard>
            <PlayerCard>
                <Text width="13ch">frankyy</Text>
            </PlayerCard>
        </Flex>
    )
}

export default PlayerList
