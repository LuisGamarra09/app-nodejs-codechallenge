import { CreateTransactionRequestDto } from "src/application/dtos/CreateTransactionRequestDto";

export interface CreateTransactionPort {
    execute(request: CreateTransactionRequestDto): Promise<void>;
  }