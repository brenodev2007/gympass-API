import { UserRepository } from "../repositories/users-repository";
import { invalidCredencialsError } from "./errors/invalid-credencials";
import { compare } from "bcryptjs";
import { User } from "../../generated/prisma";

interface GetProfileRequest {
  userId: string;
}

interface GetProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: GetProfileRequest): Promise<GetProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new invalidCredencialsError();
    }

    return {
      user,
    };
  }
}
