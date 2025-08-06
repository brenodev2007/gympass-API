import { Prisma, Gym } from "generated/prisma";

export interface GymRepositories {
  findById(id: string): Promise<Gym | null>;
}
