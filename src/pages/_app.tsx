import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>1일1명언 - 쎄잉 (Saying)</title>
        <meta
          name="description"
          content="1일1명언으로 활기찬 하루를 시작해보세요!"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
