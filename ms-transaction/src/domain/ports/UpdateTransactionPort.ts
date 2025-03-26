import { EventInbound } from "src/infraestructure/broker/model/EventInbound";

export interface UpdateTransactionPort {
    execute(message: EventInbound): Promise<void>;
  }