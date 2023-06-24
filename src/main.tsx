import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import Providers from './providers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Fragment>
    {/* <Providers> */}
      <App />
    {/* </Providers> */}
  </React.Fragment>,
)
