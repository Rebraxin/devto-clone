import Head from 'next/head'

const Metatags = ({
  title = 'Next.js + Firebase',
  description = "A Dev.to's clone made with Next.js + Firebase",
  image = 'https://www.cedricpaje.fr/images/thumbnail-devto-clone.png',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default Metatags
