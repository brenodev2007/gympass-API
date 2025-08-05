import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "../../repositories/prisma-user-repository";
import { AuthenticateUseCase } from "../../use-cases/authenticate";
import { invalidCredencialsError } from "@/use-cases/errors/invalid-credencials";
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const AuthenticateBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = AuthenticateBody.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

    const result = await authenticateUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send({
      message: "User authenticated successfully",
    });
  } catch (error) {
    if (error instanceof invalidCredencialsError) {
      return reply.status(400).send({
        message: "Invalid credentials",
      });
    }

    return reply.status(500).send({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}
