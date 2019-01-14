/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { mq, colors } from '../styles'
import logo from '../static/images/logo.png'

const TIMING = '150ms'

const footerWrapperStyle = css(
  mq({
    padding: [`30px 25px`, `35px 35px`, `55px 85px`],
    background: colors.cream,
  })
)

const flex = css({
  maxWidth: 1200,
  margin: 'auto',
  display: 'flex',
})

const logoStyle = css({
  transition: `transform ${TIMING}, color ${TIMING}`,
  filter: `invert(1)`,
  '&:hover': {
    transform: 'rotate(-8deg)',
  },
})

const logoWrapperStyle = css({
  padding: `90px 0px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const leftWrapper = css({
  marginRight: 15,
  flex: 1,
})

const rightWrapper = css({
  marginRight: 15,
  flex: 2,
})

const imagePlaceholder = height =>
  css({
    height,
    width: '100%',
    maxWidth: 900,
    background: '#333',
  })

const aboutSectionStyle = css({
  fontSize: 20,
  lineHeight: 1.4,
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
})

const Footer = ({ aboutHtml }) => (
  <div css={footerWrapperStyle}>
    <div css={css(flex, { marginBottom: 15 })}>
      <div css={leftWrapper}>
        <div css={logoWrapperStyle}>
          <img alt="offbeat logo" src={logo} css={logoStyle} />
        </div>
        <div css={imagePlaceholder(400)} />
      </div>
      <div css={rightWrapper}>
        <div css={imagePlaceholder(300)} />
        <div
          dangerouslySetInnerHTML={{ __html: aboutHtml }}
          css={aboutSectionStyle}
        />
      </div>
    </div>
    <div css={flex}>
      <div css={imagePlaceholder(300)} />
    </div>
  </div>
)

export default Footer
