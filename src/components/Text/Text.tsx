import styled from 'styled-components'
import { space, typography, layout } from 'styled-system'
import { TextProps } from './types'

const Text = styled.div<TextProps>`
    font-weight: ${({ bold }) => (bold ? 600 : 400)};
    line-height: 1.5;
    ${({ textTransform }) =>
        textTransform && `text-transform: ${textTransform};`}
    ${({ ellipsis }) =>
        ellipsis &&
        `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}
    color: ${({ color }) => color};
    ${space}
    ${typography}
  ${layout}
`

Text.defaultProps = {
    fontSize: '14px',
    ellipsis: false,
}

export default Text
