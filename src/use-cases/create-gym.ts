import { Gym } from "generated/prisma";
import { GymRepositories } from "@/repositories/gym-repositories";

interface CreateGymUseCaseRequest {
  title: string;
  description?: string | null;
  phone: string | null;
  password: string;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class RegisterUseCase {
  constructor(private gymsRepository: GymRepositories) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest) {
    const gym = await this.gymsRepository.create({
      title,
      description: description ?? null,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
