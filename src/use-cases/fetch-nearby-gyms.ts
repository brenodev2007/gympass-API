import { GymRepositories } from "@/repositories/gym-repositories";
import { Gym } from "../../generated/prisma";

interface FetchNearByUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearByUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearByUseCase {
  constructor(private gymRepository: GymRepositories) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByUseCaseRequest): Promise<FetchNearByUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
