import { Transaction } from "../entities/Transaction";

export interface TransactionRepositoryPort {
    save(transaction: Transaction): Promise<Transaction>;
    findById(id: string): Promise<Transaction>;
    updateStatus(transactionExternalId: string, status: string): Promise<void>;
  }