import { CheckIn } from "../../generated/prisma";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryRequest {
  userId: string;
}

interface FetchUserCheckInsHistoryResponse {
  checkin: CheckIn[];
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);

    return { checkin: checkIns };
  }
}
