import { yyyyMMdd } from '@/modules/time'
import { Saying } from '@prisma/client'
import classNames from 'classnames'
import domtoimage from 'dom-to-image'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import { getTodaySaying } from './api/today-saying'
import $ from './index.module.scss'

type HomeProps = {
  todaySaying: Saying | null
}

function saveImage() {
  const captureDOM = document.getElementById('capture') as HTMLElement

  captureDOM.style.visibility = 'visible'

  domtoimage.toPng(captureDOM).then((dataURL) => {
    const image = dataURL.replace('image/png', 'image/octet-stream')
    const link = document.createElement('a')
    link.setAttribute('download', '쎄잉.png')
    link.setAttribute('href', image)
    document.body.appendChild(link)
    link.click()
    link.remove()
    captureDOM.style.visibility = 'hidden'
  })
}

const Home: NextPage<HomeProps> = ({
  todaySaying,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isParagraphLoaded, setIsParagraphLoaded] = useState(false)
  const [isAllSet, setIsAllSet] = useState(false)

  useEffect(() => {
    let lastDate = yyyyMMdd()

    const interval = setInterval(async () => {
      const currentDate = yyyyMMdd()

      if (lastDate !== currentDate) {
        window.location.reload()
      }

      lastDate = currentDate
    }, 1000 * 60)

    return () => {
      clearTimeout(interval)
    }
  }, [])

  let previousDelay = 0

  return (
    <>
      <div
        id="capture"
        tabIndex={-1}
        style={{
          fontFamily: 'Arita',
          fontWeight: 500,
          position: 'fixed',
          top: 0,
          left: 0,
          visibility: 'hidden',
          width: '1200px',
          height: 'auto',
          padding: '100px 100px 30px',
          textAlign: 'center',
          backgroundColor: 'var(--foundation)',
          color: 'var(--text-color)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <div
          style={{
            fontSize: '76px',
            lineHeight: 1.4,
          }}
        >
          {todaySaying?.paragraph}
        </div>
        <div
          style={{
            fontSize: '50px',
            fontWeight: 600,
            marginTop: '68px',
          }}
        >
          - {todaySaying?.author} -
        </div>
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            fontSize: '34px',
            fontWeight: 400,
            marginTop: '136px',
            color: 'var(--gray)',
          }}
        >
          www.saying.today
        </div>
      </div>
      <div className={$['home']}>
        {/* <nav className={$['nav']}>
          <a href={getLoginURL('saying.today')}>로그인</a>
        </nav> */}
        <div className={$['saying']}>
          <blockquote className={$['paragraph']}>
            {todaySaying?.paragraph.split(' ').map((w, index) => {
              const currentDelay = previousDelay + 600 / (index ** 0.5 + 1)
              previousDelay = currentDelay

              return (
                <Fragment key={w + index}>
                  <span
                    className={classNames($['word'], $['character'])}
                    style={{
                      animationDelay: `${currentDelay}ms`,
                    }}
                    onAnimationEnd={() => {
                      if (
                        index ===
                        todaySaying.paragraph.split(' ').length - 1
                      ) {
                        setIsParagraphLoaded(true)
                      }
                    }}
                  >
                    {w}
                  </span>{' '}
                </Fragment>
              )
            })}
          </blockquote>
          {todaySaying?.author && (
            <address
              className={
                $['author'] + (isParagraphLoaded ? ` ${$['visible']}` : '')
              }
              onTransitionEnd={() => {
                setIsAllSet(true)
              }}
            >
              - {todaySaying?.author} -
            </address>
          )}

          <div
            className={classNames(
              $['menu-bar'],
              isAllSet ? 'visible' : 'hidden'
            )}
          >
            <button className={$['save-photo']} onClick={saveImage}>
              <i className={classNames('f7-icons')}>photo</i>
              이미지로 저장
            </button>
            {/* <button className={style.share} onClick={saveImage}>
            <i className={classNames('f7-icons')}>square_arrow_up</i>
            공유
          </button> */}
          </div>
        </div>
      </div>
      {/* <CommentsSection /> */}
      <footer className={$['footer']}>
        <a
          href="https://github.com/payw-org/saying.today"
          className={classNames($['credit'], isAllSet ? 'visible' : 'hidden')}
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="f7-icons">logo_github</i> GitHub
        </a>
      </footer>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const todaySaying = await getTodaySaying()

  return {
    props: {
      todaySaying,
    },
  }
}
