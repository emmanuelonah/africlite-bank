export interface ClientResponse<DataType> {
    success: boolean;
    data: DataType;
}

export function response<D = Record<string, any>>(data: D) {
    return { success: true, data };
}
