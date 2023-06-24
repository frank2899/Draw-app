import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './states/index.ts'

const RootElem = document.getElementById('root')
const Root = createRoot(RootElem as HTMLElement)

Root.render(
    <Fragment>
        <Provider store={store}>
            <App />
        </Provider>
    </Fragment>,
)
