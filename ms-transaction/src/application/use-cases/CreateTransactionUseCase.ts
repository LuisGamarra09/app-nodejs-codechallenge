import { CreateTransactionRequestDto } from "../dtos/CreateTransactionRequestDto";
import { Transaction } from "src/domain/entities/Transaction";
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { TransactionStatusEnum, TransactionTypeEnum } from "../enums/Transaction.enum";
import { EventOutbound } from "src/infraestructure/broker/model/EventOutbound";
import { CreateTransactionPort } from "src/domain/ports/CreateTransactionPort";
import { KafkaPort } from "src/domain/ports/kafkaPort";
import { TransactionRepositoryPort } from "src/domain/ports/TransactionRepositoryPort";

@Injectable()
export class CreateTransactionUseCase implements CreateTransactionPort {
  private readonly logger = new Logger(CreateTransactionUseCase.name);

  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: TransactionRepositoryPort,
    @Inject('IKafkaPort') 
    private readonly kafkaPort: KafkaPort,
  ) {}

  async execute(request: CreateTransactionRequestDto): Promise<any> {
    this.logger.log('Creating a new transaction');

    this.validateTransactionType(request.tranferTypeId);

    const transaction = await this.transactionRepository.save(
      new Transaction.Builder()
        .setTransactionExternalId(uuidv4())
        .setAccountExternalIdDebit(request.accountExternalIdDebit)
        .setAccountExternalIdCredit(request.accountExternalIdCredit)
        .setType(TransactionTypeEnum[request.tranferTypeId])
        .setStatus(TransactionStatusEnum.PENDING)
        .setValue(request.value)
        .setCreateAt(new Date())
        .build()
    );

    this.logger.log(`Transaction created: ${JSON.stringify(transaction)}`);

    const eventOutbound = new EventOutbound(
      transaction.id,
      transaction.value,
      transaction.transactionExternalId,
      transaction.status
    );

    this.logger.log(`Sending event to Kafka: ${JSON.stringify(eventOutbound)}`);
    await this.kafkaPort.sendValidate(eventOutbound);

    return transaction;
  }
  
  private validateTransactionType(tranferTypeId: number): void {
    const validTransactionTypes = Object.values(TransactionTypeEnum).filter(value => typeof value === 'number');
    if (!validTransactionTypes.includes(tranferTypeId)) {
      const validTypesString = Object.entries(TransactionTypeEnum)
        .filter(([key, value]) => typeof value === 'number')
        .map(([key, value]) => `${value} = ${key}`)
        .join(', ');
      throw new BadRequestException(`Invalid transaction type: ${tranferTypeId}. Valid types are: ${validTypesString}`);
    }
  }  
}