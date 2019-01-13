/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { colors, mq, fontSizes } from '../styles'

const videoWrapperStyle = css(
  mq({
    position: 'relative',
    height: [250, 350, 300, 400],
    width: [150, 250, 400, 500],
    margin: 'auto',
    boxSizing: 'border-box',
    background: 'black',
    overflow: 'hidden',
    cursor: 'pointer',
  })
)

const titleStyle = current =>
  css(
    fontSizes.headingFontSize,
    mq({
      cursor: 'pointer',
      fontWeight: 'bold',
      color: '#f7f5f2',
      transition: '200ms ease opacity, transform 300ms, color 150ms',
      opacity: current ? 1 : 0,
      textTransform: 'uppercase',
      textDecoration: 'underline',
      zIndex: 100,
      position: 'absolute',
      top: '50%',
      left: '50%',
      minWidth: '100%',
      width: 'auto',
      height: 'auto',
      transform: `translateX(-50%) translateY(${current ? '0px' : '70px'})`,
      '&:hover': {
        color: ['#f7f5f2', '#f7f5f2', colors.red],
      },
    })
  )

const videoStyle = css({
  background: 'black',
  position: 'absolute',
  opacity: 0.7,
  top: '50%',
  left: '50%',
  height: '100%',
  width: 'auto',
  transform: 'translateX(-50%) translateY(-50%)',
})

class PreviewVideo extends React.Component {
  mouseEnter = () => {
    const { current } = this.props
    if (!current) {
      this.video.play()
    }
  }

  mouseLeave = () => {
    const { current } = this.props
    if (!current) {
      this.video.pause()
    }
  }

  render() {
    const { src, onClick, title = 'hi', current, poster } = this.props
    if (this.video) {
      !current ? this.video.pause() : this.video.play()
    }
    return (
      <div
        onClick={onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <h3 css={titleStyle(current)}>{title}</h3>
        <div css={videoWrapperStyle}>
          <video
            ref={element => (this.video = element)}
            css={videoStyle}
            width="100%"
            height="100%"
            muted={true}
            poster={poster}
            controls={false}
            playsInline
            loop
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>
    )
  }
}

export default PreviewVideo
