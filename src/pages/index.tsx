import { prisma } from '@/modules/prisma'
import style from '@/styles/Home.module.scss'
import { Saying } from '@prisma/client'
import { GetServerSideProps, NextPage } from 'next'

type HomeProps = {
  todaySaying: Saying | null
}

const Home: NextPage<HomeProps> = ({ todaySaying }) => {
  return (
    <div className={style.home}>
      <div className={style.saying}>
        <blockquote className={style.paragraph}>
          {todaySaying?.paragraph}
        </blockquote>
        {todaySaying?.author && (
          <address className={style.author}>- {todaySaying?.author}</address>
        )}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const todaySaying = await prisma.saying.findOne({
    where: {
      id: 1,
    },
  })

  return {
    props: {
      todaySaying,
    },
  }
}
