import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Transactions', schema: 'dbo' })
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'transaction_external_id' })
    transactionExternalId: string;

    @Column({ type: 'varchar', name: 'account_external_id_debit' })
    accountExternalIdDebit: string;

    @Column({ type: 'varchar', name: 'account_external_id_credit' })
    accountExternalIdCredit: string;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'datetime', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'decimal' })
    value: number;

    static Builder = class {
        public transaction: Transaction;

        constructor() {
            this.transaction = new Transaction();
        }

        setTransactionExternalId(transactionExternalId: string): this {
            this.transaction.transactionExternalId = transactionExternalId;
            return this;
        }

        setAccountExternalIdDebit(accountExternalIdDebit: string): this {
            this.transaction.accountExternalIdDebit = accountExternalIdDebit;
            return this;
        }

        setAccountExternalIdCredit(accountExternalIdCredit: string): this {
            this.transaction.accountExternalIdCredit = accountExternalIdCredit;
            return this;
        }

        setType(type: string): this {
            this.transaction.type = type;
            return this;
        }

        setStatus(status: string): this {
            this.transaction.status = status;
            return this;
        }

        setCreateAt(createdAt: Date): this {
            this.transaction.createdAt = createdAt;
            return this;
        }

        setValue(value: number): this {
            this.transaction.value = value;
            return this;
        }

        setUpdateAt(updatedAt: Date): this {
            this.transaction.updatedAt = updatedAt;
            return this;
        }

        build(): Transaction {
            return this.transaction;
        }
    }
}