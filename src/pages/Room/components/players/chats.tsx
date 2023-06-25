import { styled } from 'styled-components'
import { Box, Flex, Text } from '../../../../components'
import { useChats } from '../../../../states/chats/hook'
import { IChat } from '../../../../states/chats/types'

const ChatContainer = styled(Flex)`
    height: 328px;
    padding: 0.5rem;
    overflow-y: auto;
    flex-direction: column;
    gap: 10px;
`

const ChatBox = () => {
    const { messageList } = useChats()

    return (
        <Box border="1px solid black" borderRadius="0.5rem" background="white">
            <Box borderBottom="1px solid black" padding="1rem 1rem .5rem 1rem">
                <Text fontWeight="bolder" fontSize="1.1rem">
                    Chats
                </Text>
            </Box>
            <ChatContainer>
                {messageList.map((item: IChat, i: number) => {
                    return (
                        <Flex
                            flexDirection="column"
                            borderRadius=".5rem"
                            background="#f2f2f2"
                            padding="3px"
                            key={`messages-${i}`}
                        >
                            <Flex flexDirection="row">
                                <Text fontSize=".6rem" color="gray">
                                    #{item.playerId} - {item.playerName}
                                </Text>
                            </Flex>
                            <Flex flexDirection="row">
                                <Text fontSize=".9rem">{item.message}</Text>
                            </Flex>
                        </Flex>
                    )
                })}
            </ChatContainer>
        </Box>
    )
}

export default ChatBox
