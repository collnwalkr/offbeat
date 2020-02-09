/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles'

const videoStyle = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '100%',
  minHeight: '100%',
  width: 'auto',
  height: 'auto',
  transform: 'translateX(-50%) translateY(-50%)',
})

const overlayStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: colors.background,
  opacity: 0.18,
})

const HeroVideo = ({ src, poster }) => (
  <div>
    <video
      css={videoStyle}
      width="100%"
      height="100%"
      autoPlay={true}
      muted={true}
      loop
      poster={poster}
      controls={false}
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
    <div css={overlayStyle} />
  </div>
)

export default HeroVideo
