import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>1일 1명언 - 쎄잉 (Saying)</title>
        <meta name="description" content="1일 1명언으로 의미 있는 하루를" />
        <meta property="og:title" content="1일 1명언 - 쎄잉 (Saying)" />
        <meta
          property="og:description"
          content="1일 1명언으로 의미 있는 하루를"
        />
        <meta property="og:image" content="https://saying.today/og-image.png" />
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-140443623-2"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-140443623-2');
  `,
              }}
            ></script>
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
