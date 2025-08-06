import { Prisma, CheckIn } from "generated/prisma";

export interface CheckInsRepository {
  create(data: Prisma.CheckInCreateInput): Promise<CheckIn>;

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
