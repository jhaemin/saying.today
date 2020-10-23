import { prisma } from '@/modules/prisma'
import style from '@/styles/Home.module.scss'
import { Saying } from '@prisma/client'
import { format } from 'date-fns'
import { GetServerSideProps, NextPage } from 'next'

function autoRefresh() {
  // TODO: Implement automatic today's saying refresh
}

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
          <address className={style.author}>— {todaySaying?.author}</address>
        )}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const id =
    (new Date(format(new Date(), 'yyyy-MM-dd')).getTime() / 86_400_000) % 500

  const todaySaying = await prisma.saying.findOne({
    where: {
      id,
    },
  })

  return {
    props: {
      todaySaying,
    },
  }
}
