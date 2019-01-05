/** @jsx jsx */
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import clamp from 'lodash/clamp'
import { jsx, css } from '@emotion/core'
import { colors, mq } from '../styles'

const SHUTTER_HEIGHT = 70

const multiples = [1.4, 1.2, 1]

const COLORS = ['green', 'red', 'yellow']

const shutterWrapper = ({ color, rotation, position }) =>
  css(
    {
      position: 'absolute',
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 150ms',
      width: '110%',
      height: SHUTTER_HEIGHT,
      background: color,
    },
    position === 'top'
      ? {
          left: 0,
          top: -SHUTTER_HEIGHT + rotation * 10,
          transformOrigin: `0% 50%`,
        }
      : {
          right: 0,
          bottom: -SHUTTER_HEIGHT + rotation * 10,
          transformOrigin: `100% 50%`,
        }
  )

class Shutter extends React.Component {
  render() {
    const { color, rotation, position } = this.props
    return (
      <div
        css={shutterWrapper({ color, rotation, position })}
        ref={element => (this.root = element)}
      />
    )
  }
}

const getRotation = (top, multiple) =>
  ((window.innerHeight - Math.abs(top)) / 200) * multiple

class Shutters extends React.Component {
  state = { rotations: [0, 0, 0] }

  handleScroll = () => {
    requestAnimationFrame(() => {
      const { top } = ReactDOM.findDOMNode(
        this.shutter.root.parentNode
      ).getBoundingClientRect()

      const rotations = [
        clamp(getRotation(top, multiples[0]), 0, 3.5),
        clamp(getRotation(top, multiples[1]), 0, 2.5),
        clamp(getRotation(top, multiples[2]), 0, 1.5),
      ]
      this.setState({ rotations })
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { rotations } = this.state
    const { position } = this.props
    return (
      <Fragment>
        <Shutter
          position={position}
          color={COLORS[0]}
          rotation={rotations[0]}
          ref={element => (this.shutter = element)}
        />
        <Shutter
          position={position}
          color={COLORS[1]}
          rotation={rotations[1]}
        />
        <Shutter
          position={position}
          color={COLORS[2]}
          rotation={rotations[2]}
        />
      </Fragment>
    )
  }
}

export default Shutters
