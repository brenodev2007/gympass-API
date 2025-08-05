import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { registerUseCase } from "../../use-cases/register";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(400).send({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }

  return reply.status(201).send({ message: "User registered successfully" });
}
