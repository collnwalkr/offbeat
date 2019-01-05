/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { mq, colors } from '../styles'
import logo from '../static/images/logo.png'
import logoDark from '../static/images/logo-dark.png'

const navBarStyle = showNavBarFully =>
  css(
    mq({
      zIndex: 100,
      position: 'fixed',
      boxSizing: 'border-box',
      top: 0,
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: [`10px 25px`, `20px 35px`, `20px 85px`],
      background: `rgba(248, 246, 244, ${showNavBarFully ? 1 : 0})`,
      transition: 'background 150ms',
    })
  )

const linkWrapper = css({
  display: 'flex',
  alignItems: 'center',
})

const logoStyle = css({
  cursor: 'pointer',
  transform: 'rotate(-4deg)',
  transition: 'transform 150ms, color 150ms',
  '&:hover': {
    transform: 'rotate(-8deg)',
  },
  width: '100%',
})

const logoWrapperStyle = css(
  mq({
    width: [50, 80, 100],
  })
)

const linkStyle = showNavBarFully =>
  css(
    mq({
      textDecoration: 'none',
      cursor: 'pointer',
      padding: ['5px 10px', '5px 10px', '10px 30px'],
      transform: 'rotate(-4deg)',
      transition: 'transform 150ms, color 150ms',
      color: showNavBarFully ? 'black' : 'white',
      '&:hover': {
        color: colors.red,
        transform: 'rotate(-8deg)',
      },
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      fontSize: [12, 18],
    })
  )

class Link extends React.Component {
  scrollToRef = () => {
    const { href = '' } = this.props
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 110
      console.log('top', top)
      window.scrollTo({ top, behavior: 'smooth' })
      window.history.replaceState({}, '', href)
    }
  }

  render() {
    const { href, children, showNavBarFully } = this.props
    return (
      <a
        css={linkStyle(showNavBarFully)}
        // href={href}
        onClick={this.scrollToRef}
      >
        {children}
      </a>
    )
  }
}

class NavBar extends React.Component {
  state = {
    showNavBarFully: false,
  }

  handleScroll = () => {
    requestAnimationFrame(() => {
      const { scrollY } = window
      const { showNavBarFully } = this.state
      if (scrollY > 40 && !showNavBarFully) {
        this.setState({ showNavBarFully: true })
      } else if (scrollY < 40 && showNavBarFully) {
        this.setState({ showNavBarFully: false })
      }
    })
  }

  handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState({}, '', window.location.pathname)
  }

  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  componentWillUnmount = () =>
    window.removeEventListener('scroll', this.handleScroll)

  render() {
    const { showNavBarFully } = this.state
    return (
      <div css={navBarStyle(showNavBarFully)}>
        <div css={logoWrapperStyle}>
          <img
            src={showNavBarFully ? logoDark : logo}
            css={logoStyle}
            onClick={this.handleLogoClick}
          />
        </div>
        <div css={linkWrapper}>
          <Link showNavBarFully={showNavBarFully} href="#videos">
            Videos
          </Link>
          <Link showNavBarFully={showNavBarFully} href="#contact">
            Contact
          </Link>
          <Link showNavBarFully={showNavBarFully}>About</Link>
        </div>
      </div>
    )
  }
}

export default NavBar
