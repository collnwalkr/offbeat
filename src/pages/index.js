import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

import NavBar from '../components/nav-bar'

import Hero from '../components/hero'
import HeroVideo from '../components/hero-video'
import HeroTitle from '../components/hero-title'
import sizzleReal from '../static/videos/test-vid.mp4'

import logo from '../static/images/logo.png'

import VideoCarousel from '../components/video-carousel'

import VimeoPlayer from '../components/vimeo-player'

class IndexPage extends React.Component {
  state = {
    videoPlayerOpen: false,
    videoPlayerURL: null,
  }

  videoPlayerClick = videoPlayerURL =>
    this.setState({ videoPlayerOpen: true, videoPlayerURL })

  render() {
    const { videoPlayerOpen, videoPlayerURL } = this.state

    return (
      <Layout>
        <NavBar />
        {videoPlayerOpen && (
          <VimeoPlayer
            url={videoPlayerURL}
            onClick={() => this.setState({ videoPlayerOpen: false })}
          />
        )}
        <Hero>
          <HeroVideo src={sizzleReal} />
          <HeroTitle words={['unexpected', 'brilliant', 'defiant']}>
            {`video \n production house`}
          </HeroTitle>
        </Hero>
        <div id="videos">
          <VideoCarousel
            openVideoPlayer={this.videoPlayerClick}
            videos={[
              {
                src: sizzleReal,
                title: 'cool vid bro',
                url: 'https://vimeo.com/286296762',
                poster: logo,
              },
              {
                src: sizzleReal,
                title: 'hello there',
                url: 'https://vimeo.com/286296762',
                poster: logo,
              },
              {
                src: sizzleReal,
                title: 'hello long title',
                url: 'https://vimeo.com/286296762',
                poster: logo,
              },
              {
                src: sizzleReal,
                title: 'a video title',
                url: 'https://vimeo.com/286296762',
                poster: logo,
              },
              {
                src: sizzleReal,
                title: 'what up',
                url: 'https://vimeo.com/286296762',
                poster: logo,
              },
            ]}
          />
        </div>
        <div style={{ height: '100vh', background: 'white' }} id="contact">
          <p>
            Life is built with stories and experiences. Offbeat is here to help
            you tell your story. Whether you're a small business, a local
            non-profit, a large corporation or even just an inspiring story,
            Offbeat wants your voice to be heard. Read more
          </p>
          <p>(214) 914-9175 info@offbeatseattle.com</p>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
