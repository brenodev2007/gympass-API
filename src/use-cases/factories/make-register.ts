import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUserRepository } from "../../repositories/prisma-user-repository";

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(prismaUserRepository);

  return registerUseCase;
}
