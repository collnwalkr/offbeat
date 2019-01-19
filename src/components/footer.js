/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { mq, colors } from '../styles'
import logo from '../static/images/logo.png'

const TIMING = '150ms'
const GUTTER = 30

const footerWrapperStyle = css(
  mq({
    padding: [`30px 25px`, `35px 35px`, `55px 85px`],
    background: colors.cream,
  })
)

const logoStyle = css({
  transition: `transform ${TIMING}, color ${TIMING}`,
  filter: `invert(1)`,
  '&:hover': {
    transform: 'rotate(-8deg)',
  },
})

const logoWrapperStyle = css(
  mq({
    padding: [`30px 0px`, `10px 50px`, `130px 0px`],
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
  'p:first-child': {
    marginTop: 40,
  },
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

const Footer = ({ aboutHtml, images }) => (
  <div css={footerWrapperStyle}>
    <div css={css(flex, topFlexStyle)}>
      <div css={leftWrapper}>
        <div css={logoWrapperStyle}>
          <img alt="offbeat logo" src={logo} css={logoStyle} />
        </div>
        <div css={imagePlaceholder(400)}>
          <img src={images[1].src} css={aboutImageStyle} />
        </div>
      </div>
      <div css={rightWrapper}>
        <div css={imagePlaceholder(350)}>
          <img src={images[0].src} css={aboutImageStyle} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: aboutHtml }}
          css={aboutSectionStyle}
        />
      </div>
    </div>
    <div css={flex}>
      <div css={imagePlaceholder(400)}>
        <img src={images[2].src} css={aboutImageStyle} />
      </div>
    </div>
  </div>
)

export default Footer
