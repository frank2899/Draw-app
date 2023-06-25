import { useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '..'
import { useSelector } from 'react-redux'
import { IChat } from './types'
import { useCallback } from 'react'
import { addChat as addChatAction } from './action'

export const useChats = () => {
    const dispatch = useDispatch<AppDispatch>()

    const messageList = useSelector<AppState, IChat[]>(
        (state) => state.chats.chats,
    )

    const sendMessage = useCallback(
        ({ message, isCorrect, playerId, playerName }: IChat) => {
            /**
             *
             * Implement socket io here
             */

            return dispatch(
                addChatAction({ message, isCorrect, playerId, playerName }),
            )
        },
        [dispatch],
    )

    return { messageList, sendMessage }
}
