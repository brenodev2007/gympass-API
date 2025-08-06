import { Prisma, Gym } from "generated/prisma";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymRepositories {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;

  searchMany(query: string, page: number): Promise<Gym[]>;

  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}
