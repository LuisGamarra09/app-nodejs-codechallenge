import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/domain/entities/Transaction";
import { TransactionRepositoryPort } from "src/domain/ports/TransactionRepositoryPort";
import { Repository } from "typeorm";

export class SqlTransactionRepository implements TransactionRepositoryPort {

  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  async updateStatus(transactionExternalId: string, status: string): Promise<void> {
    await this.repository.update({ transactionExternalId }, { status});
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return await this.repository.save(transaction);
  }

  async findById(transactionExternalId: string): Promise<Transaction> {
    return await this.repository.findOne({ where: { transactionExternalId } });
  }
}