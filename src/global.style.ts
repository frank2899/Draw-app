import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing : border-box;
    margin : 0;
    padding : 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background-color: #FFF9EF;
    transition : all .3s ease;
    padding : 1em;
  }

  .text-decoration-none{
    text-decoration : none
  }
`

export default GlobalStyle
