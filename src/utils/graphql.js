const getHomePageData = data => {
  const {
    allContentfulRotatingWords: {
      edges: [
        {
          node: { words },
        },
      ],
    },
    allContentfulVideoCarousel: {
      edges: [
        {
          node: { videos },
        },
      ],
    },
    allContentfulHeroVideo: {
      edges: [{ node: heroVideo }],
    },
    allContentfulAboutSection: {
      edges: [
        {
          node: {
            text: {
              childContentfulRichText: { html: aboutHtml },
            },
          },
        },
      ],
    },
  } = data
  return {
    words,
    videos: makeVideoSchema(videos),
    heroVideo: makeHeroVideoSchema(heroVideo),
    aboutHtml,
  }
}

const makeHeroVideoSchema = ({ video, poster }) => ({
  src: `https:${video.file.url}`,
  poster: `https:${poster.file.url}`,
})

const makeVideoSchema = videos =>
  videos.map(({ videoMp4, title, poster, vimeoLink }) => {
    return {
      src: `https:${videoMp4.file.url}`,
      title: title,
      poster: `https:${poster.file.url}`,
      url: vimeoLink,
    }
  })

export { getHomePageData }
