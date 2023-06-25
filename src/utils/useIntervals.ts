import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number): void => {
    const savedCallback = useRef<() => void>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (savedCallback.current) {
            const tick = (): void => {
                savedCallback.current!()
            }

            if (delay !== 0) {
                const interval = setInterval(tick, delay)

                return (): void => clearInterval(interval)
            }
        }
    }, [delay])
}

export default useInterval
