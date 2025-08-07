import { FetchNearByUseCase } from "../fetch-nearby-gyms";
import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function maekFetchNearbyUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearByUseCase(gymsRepository);

  return useCase;
}
