import { Prisma, Gym } from "generated/prisma";

export interface GymRepositories {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;

  searchMany(query: string, page: number): Promise<Gym[]>;
}
