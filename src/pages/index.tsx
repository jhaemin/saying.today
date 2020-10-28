import { yyyyMMdd } from '@/modules/time'
import style from '@/styles/Home.module.scss'
import { Saying } from '@prisma/client'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getTodaySaying } from './api/today-saying'

type HomeProps = {
  todaySaying: Saying | null
}

const Home: NextPage<HomeProps> = ({ todaySaying }) => {
  const [localTodaySaying, setLocalTodaySaying] = useState(todaySaying)
  const [isParagraphLoaded, setIsParagraphLoaded] = useState(false)

  useEffect(() => {
    let lastDate = yyyyMMdd()

    const interval = setInterval(async () => {
      const currentDate = yyyyMMdd()

      if (lastDate !== currentDate) {
        const res = await fetch('/api/today-saying')
        const todaySaying = await res.json()

        setLocalTodaySaying(todaySaying)
      }

      lastDate = currentDate
    }, 1000 * 60)

    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <div className={style.home}>
      <div className={style.saying}>
        <blockquote className={style.paragraph}>
          {localTodaySaying?.paragraph
            .split('')
            .map((c) => (c === ' ' ? '&nbsp;' : c))
            .map((c, i) => (
              <span
                key={i}
                className={style.character}
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
                dangerouslySetInnerHTML={{
                  __html: c,
                }}
                onAnimationEnd={() => {
                  if (i === localTodaySaying.paragraph.length - 1) {
                    setIsParagraphLoaded(true)
                  }
                }}
              />
            ))}
        </blockquote>
        {localTodaySaying?.author && (
          <address
            className={
              style.author + (isParagraphLoaded ? ` ${style.visible}` : '')
            }
          >
            — {localTodaySaying?.author}
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

  return {
    props: {
      todaySaying,
    },
  }
}
