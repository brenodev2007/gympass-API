import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register";
import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    password: z.string().min(6),
    phone: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const { title, description, latitude, longitude, phone, password } =
    createGymBodySchema.parse(request.body);

  try {
    const createGymUseCase = makeCreateGymUseCase();
    await createGymUseCase.execute({
      title,
      description,
      phone,
      password,
      latitude,
      longitude,
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
