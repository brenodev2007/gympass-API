import { invalidCredencialsError } from "./errors/invalid-credencials";
import { CheckIn } from "../../generated/prisma";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymRepositories } from "@/repositories/gym-repositories";
import { resourceNotExists } from "./errors/resource-not-exists";

interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymRepository: GymRepositories
  ) {}

  async execute({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new resourceNotExists();
    }

    //calcular a distância do gym e do user

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error("Você não pode realizar mais de um check-in por dia");
    }

    const checkin = await this.checkInsRepository.create({
      user: {
        connect: { id: userId },
      },
      gym: {
        connect: { id: gymId },
      },
    });

    if (!checkin) {
      throw new invalidCredencialsError();
    }

    return {
      checkin,
    };
  }
}
