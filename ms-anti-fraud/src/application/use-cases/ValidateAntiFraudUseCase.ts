import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventOutbound } from 'src/infraestructura/broker/model/EventOutbound';
import { KafkaPort } from 'src/domain/ports/kafkaPort';
import { ValidateAntiFraudPort } from 'src/domain/ports/ValidateAntiFraudPort';
import { EventInbound } from 'src/infraestructura/broker/model/EventInbound';
import { TransactionStatus } from '../enums/Transaction.enum';

@Injectable()
export class ValidateAntiFraudUseCase implements ValidateAntiFraudPort {
  private static readonly FRAUD_THRESHOLD = 1000;
  private readonly logger = new Logger(ValidateAntiFraudUseCase.name);

  constructor(@Inject('IKafkaPort') private readonly kafkaPort: KafkaPort) {}

  async execute(message: EventInbound): Promise<void> {

    const { id, value, transactionExternalId } = message;
    const status = this.isFraudulent(value)
      ? TransactionStatus.REJECTED
      : TransactionStatus.APPROVED;

    this.logger.log(`Transaction is ${status === TransactionStatus.REJECTED ? 'Fraudulent' : 'Not Fraudulent'}`);

    const eventOut = new EventOutbound(id, transactionExternalId, status);
    await this.kafkaPort.sendTransactionProcessed(eventOut);
  }

  private isFraudulent(value: number): boolean {
    return value > ValidateAntiFraudUseCase.FRAUD_THRESHOLD;
  }
}