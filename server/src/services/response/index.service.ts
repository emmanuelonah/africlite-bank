export interface ClientResponse<DataType> {
    success: boolean;
    data: DataType;
}

export function response<D = Record<string, unknown>>(data: D) {
    return { success: true, data };
}
