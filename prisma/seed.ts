import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {


  const userInput: Prisma.AuthorCreateInput = {
    name: 'sam',
    surname: 'halfcorpse',
  }
  const user = await prisma.author.create({
    data: userInput
  })

  const teamInput: Prisma.TeamCreateInput = {
    name: 'myteam'
  }
  const team = await prisma.team.create({
    data: teamInput
  })

  const authorTeamInput: Prisma.AuthorTeamCreateInput = {
    teamId: {connect: {id: team.id}},
    authorId: {connect: {id: user.id}}
  }

  const authorTeam = await prisma.authorTeam.create({
    data: authorTeamInput
  })

  const boardInput: Prisma.BoardCreateInput = {
    teamId: {connect: {id: team.id}},
    title: 'My board'
  }

  const board = await prisma.board.create({
    data: boardInput
  })
  console.log({ team, board, authorTeam, user })
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