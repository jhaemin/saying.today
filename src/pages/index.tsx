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
          {localTodaySaying?.paragraph}
        </blockquote>
        {localTodaySaying?.author && (
          <address className={style.author}>
            — {localTodaySaying?.author}
          </address>
        )}
      </div>

      <p>PAYW</p>
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
