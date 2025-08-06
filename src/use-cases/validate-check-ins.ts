import { invalidCredencialsError } from "./errors/invalid-credencials";
import { CheckIn } from "../../generated/prisma";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymRepositories } from "@/repositories/gym-repositories";
import { resourceNotExists } from "./errors/resource-not-exists";
import { getDistanceBetweenCordinates } from "@/utils/get-distance-between-coordenates";

interface ValidateCheckInRequest {
  userId: string;
  checkInId: string;
}

interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new resourceNotExists();
    }

    checkIn.validatedAt = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
