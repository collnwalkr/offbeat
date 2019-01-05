/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { mq } from '../styles'

const heroWrapperStyle = css(
  mq({
    position: 'relative',
    // height: '100vh',
    height: ['80vh', '100vh', '100vh'],
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    padding: [`10px 30px`, `20px 50px`, `45px 85px`],
    paddingBottom: [60, 120, 120],
    boxSizing: 'border-box',
    background: 'black',
  })
)

const Hero = ({ children }) => <div css={heroWrapperStyle}>{children}</div>

export default Hero
