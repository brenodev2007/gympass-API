import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register";
import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExist) {
      return reply.status(400).send({
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }

    return reply.status(500).send({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }

  return reply.status(201).send({ message: "User registered successfully" });
}
