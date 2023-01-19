import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getJokes(request) {
    return prisma.joke.findMany({
        where : {jokester:request}
    });
}

export async function getJokesBasedId(jokeId:string) {
    return prisma.joke.findUnique({
      where : {id:jokeId}
    });
}

export async function createJoke(joke:object) {
    return prisma.joke.create({data:joke})
}
