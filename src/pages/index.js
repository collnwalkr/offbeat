import React from 'react'
import Layout from '../components/layout'

import NavBar from '../components/nav-bar'
import Hero from '../components/hero'
import HeroVideo from '../components/hero-video'
import HeroTitle from '../components/hero-title'
import VideoCarousel from '../components/video-carousel'
import VimeoPlayer from '../components/vimeo-player'
import Footer from '../components/footer'
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
    const {
      words,
      videos,
      heroVideo,
      aboutHtml,
      aboutImages,
    } = getHomePageData(this.props.data)

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
          <HeroTitle words={words}>{`video \n moments`}</HeroTitle>
        </Hero>
        <div id="videos">
          <VideoCarousel
            openVideoPlayer={this.videoPlayerClick}
            videos={videos}
          />
        </div>
        <div id="contact">
          <Footer aboutHtml={aboutHtml} images={aboutImages} />
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
    allContentfulAboutSection {
      edges {
        node {
          text {
            childContentfulRichText {
              html
            }
          }
          aboutImages {
            resize(width: 2000) {
              src
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
