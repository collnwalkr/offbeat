/** @jsx jsx */
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import clamp from 'lodash/clamp'
import Color from 'color'
import { jsx, css } from '@emotion/core'

const SHUTTER_HEIGHT = 70

const multiples = [1.4, 1.2, 1]

const darken = (hex, multiple = 0.5) =>
  Color(hex)
    .darken(multiple)
    .hex()

const lighten = (hex, multiple = 0.5) =>
  Color(hex)
    .lighten(multiple)
    .hex()

const COLORS = ['#1D1C1C', '#272626', '#353535']

const shutterWrapper = ({ color, rotation, position }) =>
  css(
    {
      position: 'absolute',
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 150ms, background 200ms',
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
    const { position, currentColor } = this.props
    return (
      <Fragment>
        <Shutter
          position={position}
          // color={darken(currentColor, 0.2)}
          color={lighten(currentColor, 0.4)}
          rotation={rotations[0]}
          ref={element => (this.shutter = element)}
        />
        <Shutter
          position={position}
          // color={darken(currentColor, 0.4)}
          color={lighten(currentColor, 0.8)}
          rotation={rotations[1]}
        />
        <Shutter
          position={position}
          // color={darken(currentColor, 0.6)}
          color={lighten(currentColor, 1)}
          rotation={rotations[2]}
        />
      </Fragment>
    )
  }
}

export default Shutters
