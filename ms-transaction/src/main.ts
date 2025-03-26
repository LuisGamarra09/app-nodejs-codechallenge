import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const kafkaConsumer = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: configService.get<string>('KAFKA_BROKERS').split(','),
      },
      consumer: {
        groupId: configService.get<string>('TRANSACTION_KAFKA_GROUP_ID'),
      },
    },
  });

  kafkaConsumer.listen();
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
