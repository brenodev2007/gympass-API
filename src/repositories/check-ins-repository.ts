import { Prisma, CheckIn } from "generated/prisma";

export interface CheckInsRepository {
  create(data: Prisma.CheckInCreateInput): Promise<CheckIn>;
}
