import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transaction } from 'src/domain/entities/Transaction';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'),10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        schema: configService.get<string>('DB_SCHEMA'),
        entities: [Transaction],
        synchronize: false,
        options: {
          encrypt: false,
          enableArithAbort: true,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Transaction]),
  ],
  exports: [TypeOrmModule],
})
export class SqlServerModule {}