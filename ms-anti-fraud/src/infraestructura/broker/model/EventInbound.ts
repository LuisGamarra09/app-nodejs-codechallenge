export class EventInbound {
    id: number;
    value: number;
    transactionExternalId: string;
    status: string;

    constructor(id: number, value: number, transactionExternalId: string, status: string) {
        this.id = id;
        this.value = value;
        this.transactionExternalId = transactionExternalId;
        this.status = status;
    }
}