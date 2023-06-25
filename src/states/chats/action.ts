import { createAction } from '@reduxjs/toolkit'
import { IChat } from './types'

export const addChat = createAction<IChat>('chats/add')
