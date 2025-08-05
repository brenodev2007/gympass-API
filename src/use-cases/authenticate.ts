import { UserRepository } from "../repositories/users-repository";
import { invalidCredencialsError } from "./errors/invalid-credencials";
import { compare } from "bcryptjs";
import { User } from "../../generated/prisma";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new invalidCredencialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new invalidCredencialsError();
    }

    return {
      user,
    };
  }
}
