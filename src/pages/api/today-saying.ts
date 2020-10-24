import { prisma } from '@/modules/prisma'
import { currentDateString } from '@/modules/time'
import { NextApiRequest, NextApiResponse } from '@/types/next-extend'

export async function getTodaySaying() {
  const id = (new Date(currentDateString()).getTime() / 86_400_000) % 500

  const todaySaying = await prisma.saying.findOne({
    where: {
      id,
    },
  })

  return todaySaying
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getTodaySaying())
}
