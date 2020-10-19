import { prisma } from '@/modules/prisma'
import { NextApiRequest, NextApiResponse } from '@/types/next-extend'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sayings = await prisma.saying.findMany()

  res.json(sayings)
}
