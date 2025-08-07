import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserProfile } from "@/use-cases/factories/make-get-profile-user-use-case";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfile();

  const { sub: userId } = request.user as { sub: string };

  const { user } = await getUserProfile.execute({ userId });

  return reply.status(200).send({
    user,
  });
}
