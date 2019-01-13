/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'

const ldsEllipsis1 = keyframes` 
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

const ldsEllipsis2 = keyframes` 
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`

const ldsEllipsis3 = keyframes`
  from, 0%, to{
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

const loadingStyle = css({
  display: 'inline-block',
  position: 'fixed',
  width: '64px',
  height: '64px',
  '& div': {
    position: 'absolute',
    top: '27px',
    width: '11px',
    height: '11px',
    borderRadius: '50%',
    background: '#fff',
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
  },
  '& div:nth-child(1)': {
    left: '6px',
    animation: `${ldsEllipsis1} 0.6s infinite !important`,
  },
  '& div:nth-child(2)': {
    left: '6px',
    animation: `${ldsEllipsis2} 0.6s infinite`,
  },
  '& div:nth-child(3)': {
    left: '26px',
    animation: `${ldsEllipsis2} 0.6s infinite`,
  },
  '& div:nth-child(4)': {
    left: '45px',
    animation: `${ldsEllipsis3} 0.6s infinite`,
  },
})

const LoadingIndicator = () => (
  <div css={loadingStyle}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default LoadingIndicator
