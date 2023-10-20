declare module 'ThrowErrorTypes' {
    export type ThrowErrorArgTypes<Option = Record<string, any>> = {
        name: string;
        message: string;
        callee?: Function;
        option?: Option;
    };
}
