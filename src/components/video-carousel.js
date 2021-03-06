/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import Carousel from 'nuka-carousel'
import Pagination from 'react-js-pagination'
import PreviewVideo from './preview-video'
import Shutters from './shutters'
import { colors, mq } from '../styles'

const wrapperStyle = background =>
  css(
    mq({
      position: 'relative',
      overflow: 'hidden',
      padding: ['80px 0 60px', '150px 0 120px'],
      transition: 'background 200ms',
      background,
      '& .slider-frame': {
        overflow: 'visible !important',
      },
      '& .slide-visible.slider-slide': {
        zIndex: '100 !important',
      },
      '.slide-visible ~ .slide-visible': {
        zIndex: '0 !important',
      },
      '& .slider-slide': {
        paddingLeft: [5, 2, 40, 50],
        paddingRight: [5, 2, 40, 50],
      },
      '.pagination': {
        paddingTop: [20, 70],
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      '.itemClass.disabled a': {
        color: '#333 !important',
      },
      '.activeClass a': {
        color: `${colors.cream} !important`,
      },
      '.itemClass': {
        cursor: 'pointer',
        a: {
          color: colors.offWhite,
          textDecoration: 'none',
          fontSize: [30, 40],
        },
        padding: [`20px 10px`, `10px 30px`],
        '&:hover a': {
          color: colors.red,
        },
      },
    })
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
    this.setState(
      {
        slideIndex: videoIndex,
      },
      () => {
        if (this.carousel) {
          this.carousel.state.currentSlide = videoIndex
        }
      }
    )
  }

  paginationOnClick = slideIndex =>
    this.setState({ slideIndex: slideIndex - 1 })

  render() {
    const { slideIndex } = this.state
    const { videos } = this.props
    const currentColor = videos[slideIndex].backgroundColor || colors.background
    return (
      <div css={wrapperStyle(currentColor)}>
        <Shutters position="top" currentColor={currentColor} />
        <Carousel
          scrollMode="page"
          ref={el => (this.carousel = el)}
          slideIndex={slideIndex}
          afterSlide={slideIndex => this.setState({ slideIndex })}
          cellAlign="center"
          cellSpacing={20}
          withoutControls
          slidesToShow="2.25"
        >
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
        <Pagination
          hideFirstLastPages
          activePage={slideIndex + 1}
          onChange={this.paginationOnClick}
          itemClass={'itemClass'}
          activeClass={'activeClass'}
          itemsCountPerPage={1}
          totalItemsCount={videos.length}
          pageRangeDisplayed={5}
        />
        <Shutters position="bottom" currentColor={currentColor} />
      </div>
    )
  }
}

export default VideoCarousel
