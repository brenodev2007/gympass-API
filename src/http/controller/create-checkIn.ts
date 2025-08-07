import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register";
import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeCheckIn } from "@/use-cases/factories/make-check-in-use-case";

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInBodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    userId: z.string(),
    gymId: z.string(),
  });

  const { latitude, longitude, userId, gymId } = createCheckInBodySchema.parse(
    request.body
  );

  try {
    const createCheckInUseCase = makeCheckIn();
    await createCheckInUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      userId,
      gymId,
    });

    return reply.code(201).send({ message: "Check-in created successfully" });
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
