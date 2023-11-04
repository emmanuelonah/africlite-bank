export class Validation {
    public isRequired<Data = Record<string, unknown>>(_target: string, _data: Data) {}

    public minimum() {}

    public maximum() {}

    public length() {}
}
