import { yyyyMMdd } from '@/modules/time'
import style from '@/styles/Home.module.scss'
import { Saying } from '@prisma/client'
import classNames from 'classnames'
import html2canvas from 'html2canvas'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import { getTodaySaying } from './api/today-saying'

type HomeProps = {
  todaySaying: Saying | null
}

const delay = 230

function saveImage() {
  html2canvas(document.getElementById('capture') as HTMLElement).then(
    (canvas) => {
      const image = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-')
      const link = document.createElement('a')
      link.setAttribute('download', '쎄잉.png')
      link.setAttribute('href', image)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  )
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

  return (
    <div className={style.home}>
      <div
        id="capture"
        tabIndex={-1}
        style={{
          fontFamily: 'Arita',
          fontWeight: 500,
          position: 'fixed',
          top: 0,
          right: 'calc(100vw + 9999px)',
          width: '700px',
          height: 'auto',
          padding: '80px 100px 30px',
          textAlign: 'center',
          backgroundColor: 'var(--foundation)',
          color: 'var(--text-color)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: '45px',
            lineHeight: 1.4,
          }}
        >
          {todaySaying?.paragraph}
        </div>
        <div
          style={{
            fontSize: '30px',
            fontWeight: 500,
            marginTop: '40px',
          }}
        >
          - {todaySaying?.author} -
        </div>
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            fontSize: '17px',
            fontWeight: 400,
            marginTop: '80px',
            color: 'var(--gray)',
          }}
        >
          www.saying.today
        </div>
      </div>
      <div className={style.saying}>
        <blockquote className={style.paragraph}>
          {todaySaying?.paragraph.split(' ').map((w, index) => (
            <Fragment key={w + index}>
              <span
                className={classNames(style.word, style.character)}
                style={{
                  animationDelay: `${index * delay + 300}ms`,
                }}
                onAnimationEnd={() => {
                  if (index === todaySaying.paragraph.split(' ').length - 1) {
                    setIsParagraphLoaded(true)
                  }
                }}
              >
                {w}
              </span>{' '}
            </Fragment>
          ))}
        </blockquote>
        {todaySaying?.author && (
          <address
            className={
              style.author + (isParagraphLoaded ? ` ${style.visible}` : '')
            }
            onTransitionEnd={() => {
              setIsAllSet(true)
            }}
          >
            - {todaySaying?.author} -
          </address>
        )}

        <div
          className={classNames(style.menuBar, isAllSet ? 'visible' : 'hidden')}
        >
          <button className={style.savePhoto} onClick={saveImage}>
            <i className={classNames('f7-icons')}>photo</i>
            이미지로 저장
          </button>
          {/* <button className={style.share} onClick={saveImage}>
            <i className={classNames('f7-icons')}>square_arrow_up</i>
            공유
          </button> */}
        </div>
      </div>

      <a
        href="https://payw.org"
        className={classNames(style.credit, isAllSet ? 'visible' : 'hidden')}
        target="_blank"
        rel="noreferrer noopener"
      >
        made by <span style={{ fontWeight: 700 }}>PAYW</span>
      </a>
    </div>
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
