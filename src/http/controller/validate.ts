import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";

import { makeGetMetriscs } from "@/use-cases/factories/make-get-metrics-user-case";
import { makeValidateCheckIn } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateParamsSchema = z.object({
    checkInId: z.string(),
    userId: z.string(),
  });

  const { checkInId, userId } = validateParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckIn();

  await validateCheckInUseCase.execute({
    checkInId,
    userId,
  });

  return reply.code(200).send(checkInId);
}
