import { ThrowErrorArgTypes } from 'ThrowErrorTypes';

export function throwError({ name, message, option, callee }: ThrowErrorArgTypes) {
    const error = new Error();
    error.name = name;
    error.message = message;

    if (option) Object.assign(error, option);

    Error.captureStackTrace?.(error, callee);

    throw error;
}
