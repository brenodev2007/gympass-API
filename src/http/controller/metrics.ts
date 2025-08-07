import { string, z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register";
import { UserAlreadyExist } from "@/use-cases/errors/user-already-exist";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeSearchGyms } from "@/use-cases/factories/make-search-gyms-nearby-use-case";
import { makeGetMetriscs } from "@/use-cases/factories/make-get-metrics-user-case";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = metricsQuerySchema.parse(request.body);

  try {
    const MetricsUseCase = makeGetMetriscs();
    const { checkInsCount } = await MetricsUseCase.execute({
      userId: id,
    });

    return reply.code(200).send({ message: "Gyms found", checkInsCount });
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
}
