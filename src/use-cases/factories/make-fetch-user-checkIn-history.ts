import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

import { CheckInUseCase } from "../fetch-member-history";

export function makeGetMetriscs() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new CheckInUseCase(checkInsRepository);

  return useCase;
}
