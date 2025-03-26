import { EventInbound } from "src/infraestructura/broker/model/EventInbound";

export interface ValidateAntiFraudPort {
    execute(message: EventInbound): Promise<void>;
  }