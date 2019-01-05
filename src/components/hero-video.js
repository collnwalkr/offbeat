/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const videoStyle = css({
  opacity: 0.6,
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '100%',
  minHeight: '100%',
  width: 'auto',
  height: 'auto',
  transform: 'translateX(-50%) translateY(-50%)',
})

const HeroVideo = ({ src }) => (
  <video css={videoStyle} width="100%" height="100%" autoPlay muted={true} loop>
    <source src={src} type="video/mp4" />
  </video>
)

export default HeroVideo
