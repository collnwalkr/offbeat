const getHomePageData = data => {
  const {
    allContentfulRotatingWords: {
      edges: [
        {
          node: {
            words,
            endPhrase: {
              childContentfulRichText: { html: endPhrase },
            },
          },
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
  return {
    words,
    aboutImages: makeImagesScheme(aboutImages),
    videos: makeVideoSchema(videos),
    heroVideo: makeHeroVideoSchema(heroVideo),
    endPhrase: deHTMLEndPhrase(endPhrase),
    aboutHtml,
  }
}

const deHTMLEndPhrase = html => {
  const regex = /<p>([\w\W]+?)<\/p>/g
  let endWords = []
  let m
  do {
    m = regex.exec(html)
    if (m) {
      endWords.push(m[1])
    }
  } while (m)
  return endWords
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
