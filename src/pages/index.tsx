import { yyyyMMdd } from '@/modules/time'
import style from '@/styles/Home.module.scss'
import { Saying } from '@prisma/client'
import classNames from 'classnames'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import { getTodaySaying } from './api/today-saying'

type HomeProps = {
  todaySaying: Saying | null
}

const Home: NextPage<HomeProps> = ({
  todaySaying,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isParagraphLoaded, setIsParagraphLoaded] = useState(false)

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

  const delay = 230

  return (
    <div className={style.home}>
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
          >
            - {todaySaying?.author} -
          </address>
        )}
      </div>

      <a
        href="https://payw.org"
        className={style.credit}
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
