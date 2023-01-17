import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createUser(user:object)
{
    return prisma.user.create({
        data:user
    })
}
