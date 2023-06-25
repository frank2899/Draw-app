import React, { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GlobalStyle from './global.style'

const Home = React.lazy(() => import('./pages/Home'))
const Room = React.lazy(() => import('./pages/Room'))

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Home />
            </Suspense>
        ),
    },
    {
        path: '/room',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Room />
            </Suspense>
        ),
    },
])

const App = () => {
    return (
        <>
            <GlobalStyle />
            <RouterProvider router={router} />
        </>
    )
}

export default App
