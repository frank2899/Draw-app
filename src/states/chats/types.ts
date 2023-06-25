import { PlayerInterface } from '../players/types'

export interface IChat extends PlayerInterface {
    message: string
    isCorrect: boolean
}
