import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metericas";
import { CheckInUseCase } from "../checkin";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { RegisterUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new RegisterUseCase(gymsRepository);

  return useCase;
}
