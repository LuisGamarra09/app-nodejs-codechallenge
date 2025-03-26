import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { TransactionRepositoryPort } from "src/domain/ports/TransactionRepositoryPort";
import { GetTransactionResponseDto } from "../dtos/GetTransactionResponseDto";
import { GetTransactionPort } from "src/domain/ports/GetTransactionPort";
import { BaseTransaction } from "../dtos/BaseTransaction";

@Injectable()
export class GetTransactionUseCase implements GetTransactionPort {
  private readonly logger = new Logger(GetTransactionUseCase.name);

  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: TransactionRepositoryPort
  ) {}

  async execute(transactionExternalId: string): Promise<GetTransactionResponseDto> {
    this.logger.log(`Fetching transaction with ID: ${transactionExternalId}`);

    const transaction = await this.transactionRepository.findById(transactionExternalId);

    if (!transaction) {
      this.logger.warn(`Transaction with ID: ${transactionExternalId} not found`);
      throw new NotFoundException(`Transaction with ID: ${transactionExternalId} not found`);
    }

    this.logger.log(`Transaction found: ${JSON.stringify(transaction)}`);

    return new GetTransactionResponseDto.Builder()
      .setTransactionExternalId(transaction.transactionExternalId)
      .setValue(transaction.value)
      .setCreatedAt(transaction.createdAt)
      .setTransactionStatus(new BaseTransaction(transaction.status))
      .setTransactionType(new BaseTransaction(transaction.type))
      .build();
  }
}