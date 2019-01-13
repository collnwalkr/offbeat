const getHomePageData = data => {
  const {
    allContentfulRotatingWords: {
      edges: [
        {
          node: { words },
        },
      ],
    },
  } = data
  const {
    allContentfulVideoCarousel: {
      edges: [
        {
          node: { videos },
        },
      ],
    },
  } = data
  return {
    words,
    videos: makeVideoSchema(videos),
  }
}

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
