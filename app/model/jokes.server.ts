import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getJokes() {
    return prisma.joke.findMany();
}

export async function getJokesBasedId(id:string) {
    return prisma.joke.findUnique({
        where :{id:"12bb586b-ef78-4075-b9ab-8accb1d725d7"}
    });
}

export async function createJoke(joke) {
    return prisma.joke.create({data:joke})
}