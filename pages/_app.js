import '../styles/globals.css'

import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

const MyApp = (props) => {
  const { Component, pageProps } = props

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default MyApp
