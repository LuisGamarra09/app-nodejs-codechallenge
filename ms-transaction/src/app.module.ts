import { Module } from '@nestjs/common';
import { SqlTransactionRepository } from './infraestructure/database/SqlTransactionRepository';
import { TransactionController } from './infraestructure/controllers/TransactionController';
import { CreateTransactionUseCase } from './application/use-cases/CreateTransactionUseCase';
import { SqlServerModule } from './infraestructure/database/SqlServer.module';
import { GetTransactionUseCase } from './application/use-cases/GetTransactionUseCase';
import { KafkaModule } from './infraestructure/broker/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { UpdateTransactionUseCase } from './application/use-cases/UpdateTransactionUseCase';

@Module({
  imports: [
    SqlServerModule,
    KafkaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TransactionController],
  providers: [    
    {
      provide: 'ICreateTransactionPort',
      useClass: CreateTransactionUseCase,
    },
    {
      provide: 'IGetTransactionPort',
      useClass: GetTransactionUseCase,
    },
    {
      provide: 'IUpdateTransactionPort',
      useClass: UpdateTransactionUseCase,
    },
    {
    provide: 'ITransactionRepository',
    useClass: SqlTransactionRepository,
    },
  ],
})
export class AppModule {}
