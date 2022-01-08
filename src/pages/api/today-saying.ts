import { prisma } from '@/modules/prisma'
import { yyyyMMdd } from '@/modules/time'
import { NextApiRequest, NextApiResponse } from '@/types/next-extend'

export async function getTodaySaying() {
  const id = ((new Date(yyyyMMdd()).getTime() / 86_400_000) % 500) + 1

  const todaySaying = await prisma.saying.findUnique({
    where: {
      id,
    },
  })

  return todaySaying
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getTodaySaying())
}
