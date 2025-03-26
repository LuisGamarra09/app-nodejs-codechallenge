import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventOutbound } from './model/EventOutbound';
import { KafkaPort } from 'src/domain/ports/kafkaPort';


@Injectable()
export class KafkaService implements KafkaPort {
    private readonly logger = new Logger(KafkaService.name);
  
    constructor(
      @Inject('KAFKA_SERVICE') private client: ClientProxy,
    ) {}

  async sendValidate(eventOutbound: EventOutbound): Promise<void> {
    this.logger.log('Sending event to validate', JSON.stringify(eventOutbound));
    await this.client.emit(process.env.ANTI_FRAUD_KAFKA_TOPIC, {value: JSON.stringify(eventOutbound)});
  }
}