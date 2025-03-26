import { GetTransactionResponseDto } from "src/application/dtos/GetTransactionResponseDto";

export interface GetTransactionPort {
    execute(transactionExternalId: string): Promise<GetTransactionResponseDto>;
  }