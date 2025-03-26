import { EventOutbound } from "src/infraestructura/broker/model/EventOutbound";

export interface KafkaPort {
    sendTransactionProcessed(eventOutbound: EventOutbound): Promise<void>;
}