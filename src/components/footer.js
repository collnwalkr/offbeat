/** @jsx jsx */
import React from 'react'
import ReactDOM from 'react-dom'
import { jsx, css } from '@emotion/core'
import { mq, colors } from '../styles'
import logo from '../static/images/logo.png'

const TIMING = '150ms'
const GUTTER = 30

const footerWrapperStyle = css({
  background: colors.cream,
})

const footerContent = css(
  mq({
    padding: [`30px 25px`, `35px 35px`, `55px 85px`],
  })
)

const logoStyle = css({
  transition: `transform ${TIMING}, color ${TIMING}`,
  maxWidth: 220,
  filter: `invert(1)`,
  '&:hover': {
    transform: 'rotate(-8deg)',
  },
})

const logoWrapperStyle = css(
  mq({
    padding: [`30px 0px`, `10px 50px`, `65px 0px`],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)

const flex = css(
  mq({
    maxWidth: 1200,
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: ['column-reverse', 'column-reverse', 'row'],
  })
)

const leftWrapper = css(
  mq({
    display: 'flex',
    flexDirection: ['column', 'row-reverse', 'column'],
    marginRight: [0, 0, GUTTER],
    marginTop: [0, GUTTER, 0],
    flex: 3,
    flexBasis: ['100%', '100%', 0],
  })
)

const rightWrapper = css(
  mq({
    marginRight: [0, 0, GUTTER],
    flex: 5,
  })
)

const imagePlaceholder = height =>
  css(
    mq({
      height: ['inherit', 'inherit', height],
      width: '100%',
      maxWidth: 800,
      marginBottom: [GUTTER, GUTTER, 0],
    })
  )

const aboutSectionStyle = css({
  fontSize: 20,
  lineHeight: 1.4,
  color: colors.background,
  paddingBottom: 40,
  'p:not(:first-child)': {
    marginTop: 20,
  },
  i: {
    fontStyle: 'italic',
  },
  b: {
    fontWeight: 'bold',
  },
  a: {
    color: colors.background,
    fontWeight: 'normal',
  },
})

const aboutImageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  fontFamily: 'object-fit: contain;',
})

const topFlexStyle = css(
  mq({
    marginBottom: [0, 0, GUTTER],
  })
)

const bannerImage = opacity =>
  css(
    mq({
      '& img': {
        opacity,
        transition: 'opacity 250ms ease',
        objectPosition: ['50% 30%', '50% 35%'],
      },
      position: 'relative',
      height: [150, 250, 400],
      width: '100%',
    })
  )

const bottomFooterStyle = css({
  width: '100%',
  height: 40,
  background: colors.background,
})

const feather = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: `linear-gradient(180deg, rgba(247,245,242,0) 0%, rgba(247,245,242,1) 100%)`,
})

class Footer extends React.Component {
  state = { opacity: 0 }

  done = false

  handleScroll = () => {
    if (!this.done) {
      requestAnimationFrame(() => {
        const { top } = ReactDOM.findDOMNode(
          this.bannerImage.parentNode
        ).getBoundingClientRect()
        if (window.innerHeight - top > 150) {
          this.done = true
          this.setState({ opacity: 1 })
        }
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.bannerImage) {
      const { top } = ReactDOM.findDOMNode(
        this.bannerImage.parentNode
      ).getBoundingClientRect()
      if (window.innerHeight - top > 150) {
        this.done = true
        this.setState({ opacity: 1 })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { opacity } = this.state
    const { aboutHtml, images } = this.props
    return (
      <div css={footerWrapperStyle}>
        <div
          css={bannerImage(opacity)}
          ref={element => (this.bannerImage = element)}
        >
          <img src={images[0].src} css={aboutImageStyle} />
          <div css={feather} />
        </div>
        <div css={footerContent}>
          <div css={css(flex, topFlexStyle)}>
            <div css={leftWrapper}>
              <div css={imagePlaceholder(400)}>
                <img src={images[1].src} css={aboutImageStyle} />
              </div>
              <div css={logoWrapperStyle}>
                <img alt="offbeat logo" src={logo} css={logoStyle} />
              </div>
            </div>
            <div css={rightWrapper}>
              <div
                dangerouslySetInnerHTML={{ __html: aboutHtml }}
                css={aboutSectionStyle}
              />
              <div css={imagePlaceholder(350)}>
                <img src={images[2].src} css={aboutImageStyle} />
              </div>
            </div>
          </div>
        </div>
        <div css={bottomFooterStyle} />
      </div>
    )
  }
}

export default Footer
