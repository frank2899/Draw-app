import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'
import GlobalStyle from './global.style'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/room',
        element: <Room />,
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
