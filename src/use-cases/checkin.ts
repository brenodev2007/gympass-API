import { invalidCredencialsError } from "./errors/invalid-credencials";
import { CheckIn } from "../../generated/prisma";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInRequest {
  userId: string;
  gymId: string;
}

interface CheckInResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
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
