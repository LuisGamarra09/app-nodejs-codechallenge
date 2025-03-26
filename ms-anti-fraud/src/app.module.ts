import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './infraestructura/broker/kafka.module';
import { AntiFraudController } from './infraestructura/controller/AntiFraudController';
import { ValidateAntiFraudUseCase } from './application/use-cases/ValidateAntiFraudUseCase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
  ],
  controllers: [AntiFraudController],
  providers: [
    {
      provide: 'IValidateAntiFraudPort',
      useClass: ValidateAntiFraudUseCase,
    },
  ],
})
export class AppModule {}