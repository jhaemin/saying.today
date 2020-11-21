import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>1일 1명언 - 쎄잉 (Saying)</title>
        <meta name="apple-mobile-web-app-title" content="쎄잉" />
        <meta name="application-name" content="쎄잉" />
        <meta name="description" content="1일 1명언으로 의미 있는 하루를" />
        <meta property="og:title" content="1일 1명언 - 쎄잉 (Saying)" />
        <meta
          property="og:description"
          content="1일 1명언으로 의미 있는 하루를"
        />
        <meta property="og:image" content="https://saying.today/og-image.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-140443623-2', 'auto');
ga('send', 'pageview');
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
