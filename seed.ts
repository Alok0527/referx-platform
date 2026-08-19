import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default reward configuration
  const existingConfig = await prisma.rewardConfig.findFirst()
  
  if (!existingConfig) {
    const config = await prisma.rewardConfig.create({
      data: {
        referralBonus: 100,
        signupBonus: 50,
        minimumWithdrawal: 500,
        maxReferralsPerDay: 100
      }
    })
    console.log('Created default reward config:', config)
  } else {
    console.log('Reward config already exists')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
