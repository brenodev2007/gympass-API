import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate";
import { invalidCredencialsError } from "@/use-cases/errors/invalid-credencials";
export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  return reply.status(200).send();
}
