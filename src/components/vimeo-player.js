/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ReactPlayer from 'react-player'

const wrapperStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.9)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const VimeoPlayer = ({ children, url, onClick }) => (
  <div css={wrapperStyle} onClick={onClick}>
    <ReactPlayer url={url} playing={true} />
  </div>
)

export default VimeoPlayer
