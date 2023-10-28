declare module 'ThrowErrorTypes' {
    export type ThrowErrorArgTypes<Option = Record<string, unknown>> = {
        name: string;
        message: string;
        callee?: Function;
        option?: Option;
    };
}
