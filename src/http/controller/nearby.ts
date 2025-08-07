import { string, z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register";
import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeSearchGyms } from "@/use-cases/factories/make-search-gyms-nearby-use-case";
import { maekFetchNearbyUseCase } from "@/use-cases/factories/make-fetch-nearby-use-case";

export async function searchNearBy(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchGymNearbySchema = z.object({
    longitude: z.number(),
    latitude: z.number(),
  });

  const { longitude, latitude } = searchGymNearbySchema.parse(request.body);

  try {
    const searchNearByUseCase = maekFetchNearbyUseCase();
    const { gyms } = await searchNearByUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
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
