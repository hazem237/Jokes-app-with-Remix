import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs";

type LoginForm = {
    username: string;
    password: string;
  };

const prisma = new PrismaClient()

export async function createUser(user:object)
{
    return prisma.user.create({
        data:user
    })
}
export async function login(username:string , password:string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return null;
  
    const isCorrectPassword = password===user.passwordHash
    if (!isCorrectPassword) return null;
  
    return { id: user.id, username };
  }