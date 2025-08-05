import { prisma } from "../lib/prisma";
import { Prisma, User } from "generated/prisma";
import { UserRepository } from "./users-repository";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
