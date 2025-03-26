import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateTransactionPort } from 'src/domain/ports/UpdateTransactionPort';
import { TransactionRepositoryPort } from 'src/domain/ports/TransactionRepositoryPort';
import { EventInbound } from 'src/infraestructure/broker/model/EventInbound';

@Injectable()
export class UpdateTransactionUseCase implements UpdateTransactionPort {
  private readonly logger = new Logger(UpdateTransactionUseCase.name);

  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: TransactionRepositoryPort,
  ) {}

  async execute(message: EventInbound): Promise<void> {
    this.logger.log(`Updating status with id: ${message.transactionExternalId}`);

    await this.transactionRepository.updateStatus(message.transactionExternalId, message.status);
  }
}