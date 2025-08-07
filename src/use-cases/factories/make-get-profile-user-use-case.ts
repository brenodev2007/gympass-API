import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";

import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfile() {
  const prismaUserRepository = new PrismaUserRepository();
  const userProfile = new GetUserProfileUseCase(prismaUserRepository);

  return userProfile;
}
