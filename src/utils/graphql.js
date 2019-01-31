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
            aboutImages,
          },
        },
      ],
    },
  } = data
  console.log('videos', videos)
  return {
    words,
    aboutImages: makeImagesScheme(aboutImages),
    videos: makeVideoSchema(videos),
    heroVideo: makeHeroVideoSchema(heroVideo),
    aboutHtml,
  }
}

const makeImagesScheme = images =>
  images.map(({ resize: { src } }) => ({
    src: `https:${src}`,
  }))

const makeHeroVideoSchema = ({ video, poster }) => ({
  src: `https:${video.file.url}`,
  poster: `https:${poster.file.url}`,
})

const makeVideoSchema = videos =>
  videos.map(({ videoMp4, title, poster, vimeoLink, backgroundColor }) => {
    return {
      src: `https:${videoMp4.file.url}`,
      title,
      backgroundColor,
      poster: `https:${poster.file.url}`,
      url: vimeoLink,
    }
  })

export { getHomePageData }
