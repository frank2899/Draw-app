import { useDispatch } from 'react-redux'
import {
    setPlayer as setPlayerAction,
    setRoomId as setRoomIdAction,
    setRoomPlayers as setRoomPlayersAction,
} from './action'
import { AppDispatch, AppState } from '..'
import { useSelector } from 'react-redux'
import { PlayerInterface } from './types'
import { useCallback } from 'react'

export const usePlayers = () => {
    const dispatch = useDispatch<AppDispatch>()

    const roomPlayersList = useSelector<AppState, PlayerInterface[]>(
        (state) => state.players.room.players,
    )
    const playerName = useSelector<AppState, string>(
        (state) => state.players.playerName,
    )
    const playerId = useSelector<AppState, string>(
        (state) => state.players.playerId,
    )
    const roomId = useSelector<AppState, string>(
        (state) => state.players.room.roomId,
    )

    const setPlayerName = useCallback(
        ({ playerId, playerName }: PlayerInterface) => {
            return dispatch(setPlayerAction({ playerId, playerName }))
        },
        [dispatch],
    )

    const setRoomId = useCallback(
        (roomId: string) => {
            return dispatch(setRoomIdAction(roomId))
        },
        [dispatch],
    )

    const setRoomPlayers = useCallback(
        (list: PlayerInterface[]) => {
            return dispatch(setRoomPlayersAction(list))
        },
        [dispatch],
    )

    return {
        roomPlayersList,
        playerName,
        playerId,
        roomId,
        setPlayerName,
        setRoomId,
        setRoomPlayers,
    }
}
