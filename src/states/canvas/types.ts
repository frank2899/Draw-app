export interface ListsState {
    color: string
    pencilWidth: number
    history: ImageData[]
    canvas: HTMLCanvasElement | null
    historyIndex: number
}

export enum setHistoryInterface {
    INCREMENT = 'increment',
    DECREMENT = 'decrement',
}
