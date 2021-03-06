/** @jsx jsx */
import React from 'react'
import { document, exists } from 'browser-monads'
import { jsx, css } from '@emotion/core'
import { colors, fontSizes } from '../styles'

const ROTATION_DURATION = 2000

const heroTextStyle = css(fontSizes.headingFontSize, {
  color: colors.cream,
  transform: 'rotate(-4deg)',
  textDecoration: 'underline',
  alignSelf: 'flex-end',
  whiteSpace: 'pre-line',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
  fontStyle: 'oblique',
})

const rotatingTextStyle = width =>
  css({
    width,
    textDecoration: 'underline',
    color: colors.red,
    transition: 'width 200ms',
    display: 'inline-block',
  })

const getTextDimensions = (text, css) => {
  if (exists(document)) {
    const element = document.createElement('span')
    element.innerHTML = text
    element.classList.add(`css-${heroTextStyle.name}`)
    const dimensions = document.body
      .appendChild(element)
      .getBoundingClientRect()
    element.remove()
    return dimensions
  } else {
    return { width: 100 }
  }
}

class HeroTitle extends React.Component {
  state = {
    currentWord: this.props.words[0],
    currentWordIndex: 0,
    currentWordWidth: getTextDimensions(this.props.words[0]).width,
  }

  rotateWord = () => {
    const { words } = this.props
    const { currentWordIndex } = this.state
    const nextIndex =
      currentWordIndex + 1 === words.length ? 0 : currentWordIndex + 1
    const { width } = getTextDimensions(words[nextIndex])
    this.setState({
      currentWordIndex: nextIndex,
      currentWordWidth: width,
      currentWord: words[nextIndex],
    })
    setTimeout(this.rotateWord, ROTATION_DURATION)
  }

  componentDidMount() {
    this.rotateWord()
  }

  render() {
    const { endPhrase } = this.props
    const { currentWord, currentWordWidth } = this.state

    return (
      <h2 css={heroTextStyle}>
        <span css={rotatingTextStyle(currentWordWidth)}>{currentWord}</span>{' '}
        {endPhrase.join('\n')}
      </h2>
    )
  }
}

export default HeroTitle
