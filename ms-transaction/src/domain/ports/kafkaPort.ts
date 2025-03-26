import { EventOutbound } from "src/infraestructure/broker/model/EventOutbound";

export interface KafkaPort {
    sendValidate(eventOutbound: EventOutbound): Promise<void>;
}