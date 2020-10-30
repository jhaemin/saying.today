import { yyyyMMdd } from '@/modules/time'
import style from '@/styles/Home.module.scss'
import { Saying } from '@prisma/client'
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

  let i = 0
  const delay = 3000 / (todaySaying?.paragraph.length ?? 1)

  useEffect(() => {
    setTimeout(() => {
      setIsParagraphLoaded(true)
    }, (todaySaying?.paragraph.replaceAll(' ', '').length ?? 0) * delay + 1000)
  }, [])

  return (
    <div className={style.home}>
      <div className={style.saying}>
        <blockquote className={style.paragraph}>
          {todaySaying?.paragraph.split(' ').map((w, index) => (
            <Fragment key={w + index}>
              <span className={style.word}>
                {w.split('').map((c, index) => (
                  <span
                    key={c + index}
                    className={style.character}
                    style={{
                      animationDelay: `${i++ * delay}ms`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: c,
                    }}
                  />
                ))}
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
            — {todaySaying?.author} —
          </address>
        )}
      </div>

      <a
        href="https://payw.org"
        className={style.credit}
        target="_blank"
        rel="noreferrer noopener"
      >
        PAYW
      </a>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const todaySaying = await getTodaySaying()

  if (todaySaying) {
    todaySaying.paragraph = todaySaying.paragraph + '.'
  }

  return {
    props: {
      todaySaying,
    },
  }
}
