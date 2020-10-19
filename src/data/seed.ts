import { prisma } from '../modules/prisma'
import { sayings } from './sayings'

async function seed() {
  for (const saying of sayings) {
    const splitted = saying.split('/')

    await prisma.saying.create({
      data: {
        paragraph: splitted[0].trim(),
        author: splitted[1]?.trim() ? splitted[1].trim() : null,
      },
    })
  }

  prisma.$disconnect()
}

seed()
