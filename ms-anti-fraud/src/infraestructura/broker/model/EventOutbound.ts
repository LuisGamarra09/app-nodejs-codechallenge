export class EventOutbound {
    id: number;
    transactionExternalId: string;
    status: string;

    constructor(id: number, transactionExternalId: string, status: string) {
        this.id = id;
        this.transactionExternalId = transactionExternalId;
        this.status = status;
    }
}