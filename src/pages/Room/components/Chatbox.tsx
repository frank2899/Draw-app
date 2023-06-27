import { styled } from 'styled-components'
import { Box, Flex, Text } from '../../../components'
import { useChats } from '../../../states/chats/hook'
import { IChat } from '../../../states/chats/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePlayers } from '../../../states/players/hook'

const ChatContainer = styled(Flex)`
    height: 328px;
    padding: 0.5rem;
    overflow-y: auto;
    flex-direction: column;
    gap: 10px;
`

const StyledForm = styled.form`
    border-top: 1px solid black;
    padding: 0.5rem;
    background-color: white;
`

const ChatBox = () => {
    const { messageList, sendMessage } = useChats()
    const { playerName, playerId } = usePlayers()

    const [message, setMessage] = useState<string>('')
    const chatBoxRef = useRef<HTMLDivElement | null>(null)

    const handleSubmit = useCallback(
        (e: any) => {
            e.preventDefault()

            if (!message.trim()?.length) return

            sendMessage({ playerId, playerName, message, isCorrect: false })

            setMessage('')
        },
        [sendMessage, message],
    )

    useEffect(() => {
        if (chatBoxRef.current) {
            const chatContainerRef = chatBoxRef.current

            chatContainerRef.scrollTo({
                top: chatContainerRef.scrollHeight,
                // behavior: 'smooth',
            })
        }
    }, [messageList])

    return (
        <Box
            border="1px solid black"
            borderRadius="0.5rem"
            background="white"
            overflow="hidden"
        >
            <Box borderBottom="1px solid black" padding="1rem 1rem .5rem 1rem">
                <Text fontWeight="bolder" fontSize="1.1rem">
                    Chats
                </Text>
            </Box>
            <ChatContainer ref={chatBoxRef}>
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

            <StyledForm onSubmit={handleSubmit}>
                <input
                    value={message}
                    onInput={(e: any) => setMessage(e.target.value)}
                    style={{ width: '100%', padding: '.5rem' }}
                    placeholder="Write your guess here..."
                />
            </StyledForm>
        </Box>
    )
}

export default ChatBox
