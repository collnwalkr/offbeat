/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import times from 'lodash/times'
import Carousel from 'nuka-carousel'
import PreviewVideo from './preview-video'
import Shutters from './shutters'
import { colors, mq } from '../styles'

const wrapperStyle = css(
  mq({
    position: 'relative',
    overflow: 'hidden',
    padding: ['80px 0 60px', '150px 0 120px'],
    background: colors.background,
  })
)

const carouselSettings = {
  slidesToShow: 2,
  slidesToScroll: 1,
  cellAlign: 'center',
  edge: 'ease',
  speed: 300,
  swiping: false,
  dragging: false,
  withoutControls: true,
}

const paginationNumberStyle = selected =>
  css(
    mq({
      color: selected ? 'white' : colors.offWhite,
      fontSize: [30, 40],
      padding: [`10px 20px`, `10px 40px`],
      cursor: 'pointer',
      '&:hover': {
        color: selected ? 'white' : colors.red,
      },
    })
  )

const paginationNumberWrapperStyle = css(
  mq({
    paddingTop: [20, 70],
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  })
)

const PaginationNumbers = ({ current, total, onClick }) => (
  <div css={paginationNumberWrapperStyle}>
    {times(total, index => (
      <span
        css={paginationNumberStyle(current === index)}
        onClick={() => onClick(index)}
        key={index}
      >
        {index + 1}
      </span>
    ))}
  </div>
)

class VideoCarousel extends React.Component {
  state = {
    slideIndex: 0,
  }

  previewVideoOnClick = (videoIndex, vimeoUrl) => {
    const { slideIndex } = this.state
    if (videoIndex === slideIndex) {
      this.props.openVideoPlayer(vimeoUrl)
    }
    this.setState({
      slideIndex: videoIndex,
    })
  }

  paginationOnClick = slideIndex => this.setState({ slideIndex })

  render() {
    const { slideIndex } = this.state
    const { videos } = this.props
    return (
      <div css={wrapperStyle}>
        <Shutters position="top" />
        <Carousel {...carouselSettings} slideIndex={slideIndex}>
          {videos.map(({ title, src, url, poster }, index) => (
            <PreviewVideo
              title={title}
              current={slideIndex === index}
              key={index}
              src={src}
              poster={poster}
              onClick={() => this.previewVideoOnClick(index, url)}
            />
          ))}
        </Carousel>
        <PaginationNumbers
          total={videos.length}
          current={slideIndex}
          onClick={this.paginationOnClick}
        />
        <Shutters position="bottom" />
      </div>
    )
  }
}

export default VideoCarousel
