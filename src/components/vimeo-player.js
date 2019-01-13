/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { colors } from '../styles'
import LoadingIndicator from './loading-indicator'

const TIMING = '150ms'

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

const closeVideoStyle = css({
  position: 'absolute',
  bottom: 0,
  paddingBottom: 40,
  textAlign: 'center',
  color: '#BBB',
  transition: `transform ${TIMING}, color ${TIMING}`,
  '&:hover': {
    transform: 'rotate(-4deg)',
    color: colors.red,
  },
  zIndex: 10000,
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: [12, 18],
})

const iframeWrapperStyle = css({
  zIndex: 2000,
  width: '80%',
  paddingTop: '56.25%',
  position: 'relative',
})

const iframeStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})

class VimeoPlayer extends React.Component {
  getVideoNumber = url => {
    const paths = url.split('/')
    return paths[paths.length - 1]
  }

  render() {
    const { url, onClick } = this.props
    const videoNumber = this.getVideoNumber(url)
    return (
      <div css={wrapperStyle} onClick={onClick}>
        <LoadingIndicator />
        <div css={iframeWrapperStyle}>
          <iframe
            title="Video player"
            css={iframeStyle}
            src={`https://player.vimeo.com/video/${videoNumber}?autoplay=1&autopause=0&allowfullscreen=1&webkitallowfullscreen=1&mozallowfullscreen=1`}
          />
        </div>
        <div css={closeVideoStyle}>close video</div>
      </div>
    )
  }
}

export default VimeoPlayer
