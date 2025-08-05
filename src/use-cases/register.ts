import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseParams) {
  const password_hash = await hash(password, 6);

  const withSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (withSameEmail) {
    throw new Error("User already exists with this email");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password_hash,
    },
  });
}
