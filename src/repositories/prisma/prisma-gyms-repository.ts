import { Gym, Prisma } from "generated/prisma";
import { FindManyNearbyParams, GymRepositories } from "../gym-repositories";
import { prisma } from "../../lib/prisma";

export class PrismaGymsRepository implements GymRepositories {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym;
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    });

    return gyms;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gym = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gym where (6731 * latitude - 6731 * longitude) < 1000000;
    `;

    return gym;
  }
}
