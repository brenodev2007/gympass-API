import { string, z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register";
import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeSearchGyms } from "@/use-cases/factories/make-search-gyms-nearby-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.number(),
  });

  const { query, page } = searchGymQuerySchema.parse(request.body);

  try {
    const createGymUseCase = makeSearchGyms();
    const { gyms } = await createGymUseCase.execute({
      query,
      page,
    });

    return reply.code(200).send({ message: "Gyms found", gyms });
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
