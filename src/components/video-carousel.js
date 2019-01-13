/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import Carousel from 'nuka-carousel'
import Pagination from 'react-js-pagination'
import PreviewVideo from './preview-video'
import Shutters from './shutters'
import { colors, mq } from '../styles'

const wrapperStyle = css(
  mq({
    position: 'relative',
    overflow: 'hidden',
    padding: ['80px 0 60px', '150px 0 120px'],
    background: colors.background,
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
      color: '#f7f5f2 !important',
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

class VideoCarousel extends React.Component {
  state = {
    slideIndex: 1,
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
        <Carousel {...carouselSettings} slideIndex={slideIndex - 1}>
          {videos.map(({ title, src, url, poster }, index) => (
            <PreviewVideo
              title={title}
              current={slideIndex === index + 1}
              key={index}
              src={src}
              poster={poster}
              onClick={() => this.previewVideoOnClick(index + 1, url)}
            />
          ))}
        </Carousel>
        <Pagination
          hideFirstLastPages
          activePage={slideIndex}
          onChange={this.paginationOnClick}
          itemClass={'itemClass'}
          activeClass={'activeClass'}
          itemsCountPerPage={1}
          totalItemsCount={videos.length}
          pageRangeDisplayed={5}
        />
        <Shutters position="bottom" />
      </div>
    )
  }
}

export default VideoCarousel
