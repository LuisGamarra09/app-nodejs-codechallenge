import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventInbound } from '../broker/model/EventInbound';
import { ValidateAntiFraudPort } from 'src/domain/ports/ValidateAntiFraudPort';

@Controller()
export class AntiFraudController {
  private readonly logger = new Logger(AntiFraudController.name);

  constructor(
    @Inject('IValidateAntiFraudPort') private readonly validateAntiFraudPort: ValidateAntiFraudPort
  ) {}

  @MessagePattern('anti-fraud-topic')
  handleMessage(@Payload() message: EventInbound) {
    this.logger.log('Received message', JSON.stringify(message));
    this.validateAntiFraudPort.execute(message);
  }
}