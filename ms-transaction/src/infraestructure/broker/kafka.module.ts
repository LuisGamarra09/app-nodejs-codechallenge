import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaService } from './kafka.service';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('MS_TRANSACTION_CLIENT_ID'),
              brokers: configService.get<string>('KAFKA_BROKERS').split(','),
            },
            producer: {
              createPartitioner: Partitioners.DefaultPartitioner,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [    {
    provide: 'IKafkaPort',
    useClass: KafkaService,
  },],
  exports: ['IKafkaPort'],
})
export class KafkaModule {}