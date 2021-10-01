export class HttpError extends Error {
    status: number;
    message: string;
    type?: string;

    constructor(status: number, message: string, type?: string) {
        super(message);
        this.status = status;
        this.message = message;
        if (type) this.type = type;
    }

    toJSON(): {status: number, type?: string, message: string} {
        return {
            status: this.status,
            type: this.type,
            message: this.message,
        };
    }
}
