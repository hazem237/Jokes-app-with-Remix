import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getJokes() {
    return prisma.joke.findMany();
}

export async function getJokesBasedId(jokeId:string) {
    return prisma.joke.findUnique({
      where : {id:jokeId}
    });
}

export async function createJoke(joke:object) {
    return prisma.joke.create({data:joke})
}
