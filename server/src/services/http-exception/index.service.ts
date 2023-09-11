export class HttpException extends Error {
    public code: number;
    public success: boolean;
    public details?: string;
    public statusCode: number;
    public errors: Record<string, any>;
    public keyValue: Record<string, string | number>;

    constructor(statusCode: number, message: string, details = '') {
        super(message);

        Object.assign(this, {
            success: false,
            statusCode,
            message,
            details,
        });
    }
}
