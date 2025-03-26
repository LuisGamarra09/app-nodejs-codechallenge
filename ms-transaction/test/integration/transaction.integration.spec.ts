import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

describe('TransactionController', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }

    await app.close();
  });

  it('Crear una transacción y guarda en la BD', async () => {
    const transactionData = {
      accountExternalIdDebit: '6085462b-f1da-48a0-8f11-72ee428b2a38',
      accountExternalIdCredit: '0cb43a09-01a7-4019-b683-589b6b00ea57',
      tranferTypeId: 1,
      value: 9694.0,
    };

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send(transactionData);

    expect(response.status).toBe(201);

    const transaction = response.body;
    expect(transaction).toBeDefined();

    const transactionInDB = await request(app.getHttpServer()).get(
      `/transactions/${transaction.transactionExternalId}`,
    );

    expect(transactionInDB.body).toEqual({
      transactionExternalId: transaction.transactionExternalId,
      value: transaction.value,
      createdAt: transaction.createdAt,
      transactionStatus: { name: transaction.status },
      transactionType: { name: transaction.type },
    });


  });

  it('Debería devolver 404 si la transacción no existe', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions/non-existent-id')
      .expect(404);

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Transaction with ID: non-existent-id not found',
      error: 'Not Found',
    });
  });
});
