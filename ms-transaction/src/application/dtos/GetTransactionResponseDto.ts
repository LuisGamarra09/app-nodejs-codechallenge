import { BaseTransaction } from "./BaseTransaction";

export class GetTransactionResponseDto {
    transactionExternalId: string;
    transactionType: BaseTransaction;
    transactionStatus: BaseTransaction;
    value: number;
    createdAt: Date;

    static Builder = class {
        public dto: GetTransactionResponseDto;

        constructor() {
            this.dto = new GetTransactionResponseDto();
        }

        setTransactionExternalId(transactionExternalId: string): this {
            this.dto.transactionExternalId = transactionExternalId;
            return this;
        }

        setTransactionType(transactionType: BaseTransaction): this {
            this.dto.transactionType = transactionType;
            return this;
        }

        setTransactionStatus(transactionStatus: BaseTransaction): this {
            this.dto.transactionStatus = transactionStatus;
            return this;
        }

        setValue(value: number): this {
            this.dto.value = value;
            return this;
        }

        setCreatedAt(createdAt: Date): this {
            this.dto.createdAt = createdAt;
            return this;
        }

        build(): GetTransactionResponseDto {
            return this.dto;
        }
    }
}