import { Controller, Post, Body, Param, Get, Logger, Inject } from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/application/use-cases/CreateTransactionUseCase';
import { CreateTransactionRequestDto } from 'src/application/dtos/CreateTransactionRequestDto';
import { GetTransactionUseCase } from 'src/application/use-cases/GetTransactionUseCase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateTransactionUseCase } from 'src/application/use-cases/UpdateTransactionUseCase';
import { EventInbound } from '../broker/model/EventInbound';
import { CreateTransactionPort } from 'src/domain/ports/CreateTransactionPort';
import { GetTransactionPort } from 'src/domain/ports/GetTransactionPort';
import { UpdateTransactionPort } from 'src/domain/ports/UpdateTransactionPort';

@Controller('transactions')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(
    @Inject('ICreateTransactionPort') private readonly createTransactionPort: CreateTransactionPort,
    @Inject('IGetTransactionPort') private readonly getTransactionPort: GetTransactionPort,
    @Inject('IUpdateTransactionPort') private readonly updateTransactionPort: UpdateTransactionPort
  ) {}

  @Post()
  async createTransaction(@Body() createTransactionRequestDto: CreateTransactionRequestDto) {
    return await this.createTransactionPort.execute(createTransactionRequestDto);
  }

    @Get(':transactionExternalId')
    async getTransaction(@Param('transactionExternalId') transactionExternalId: string) {
        return await this.getTransactionPort.execute(transactionExternalId);
    }

    @MessagePattern('transaction-topic')
    async handleEvent(@Payload() message: EventInbound) {
      this.logger.log('Received message', JSON.stringify(message));
      await this.updateTransactionPort.execute(message);
    }
}