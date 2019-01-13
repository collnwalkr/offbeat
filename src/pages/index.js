import React from 'react'
import Layout from '../components/layout'

import NavBar from '../components/nav-bar'
import Hero from '../components/hero'
import HeroVideo from '../components/hero-video'
import HeroTitle from '../components/hero-title'
import VideoCarousel from '../components/video-carousel'
import VimeoPlayer from '../components/vimeo-player'
import { getHomePageData } from '../utils/graphql'

class IndexPage extends React.Component {
  state = {
    videoPlayerOpen: false,
    videoPlayerURL: null,
  }

  videoPlayerClick = videoPlayerURL =>
    this.setState({ videoPlayerOpen: true, videoPlayerURL })

  render() {
    const { videoPlayerOpen, videoPlayerURL } = this.state
    const { words, videos, heroVideo } = getHomePageData(this.props.data)
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
          <HeroVideo {...heroVideo} />
          <HeroTitle words={words}>{`video \n production house`}</HeroTitle>
        </Hero>
        <div id="videos">
          <VideoCarousel
            openVideoPlayer={this.videoPlayerClick}
            videos={videos}
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

export const homeQuery = graphql`
  query {
    allContentfulRotatingWords {
      edges {
        node {
          words
        }
      }
    }
    allContentfulHeroVideo {
      edges {
        node {
          video {
            file {
              url
            }
          }
          poster {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulVideoCarousel {
      edges {
        node {
          name
          videos {
            title
            vimeoLink
            videoMp4 {
              file {
                url
              }
            }
            poster {
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
