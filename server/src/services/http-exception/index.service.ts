export class HttpException extends Error {
    public code: number;
    public success: boolean;
    public statusCode: number;
    public errors: Record<string, any>;
    public keyValue: Record<string, string | number>;

    constructor(statusCode: number, message: string) {
        super(message);
        Object.assign(this, { success: false, statusCode, message });
    }
}
