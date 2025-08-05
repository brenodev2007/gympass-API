import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "../repositories/prisma-user-repository";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 6);

    const withSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (withSameEmail) {
      throw new Error("User already exists with this email");
    }

    // const prismaUserRepository = new PrismaUserRepository();

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
