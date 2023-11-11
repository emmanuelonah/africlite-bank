import React from 'react';

import { throwError, __DEV__, __TEST__ } from '..';

export type ReturnType<ContextType> = [
    React.Provider<ContextType>,
    () => ContextType,
    React.Consumer<ContextType>,
    string | undefined,
];

export function createContext<ContextType>(displayName: string): ReturnType<ContextType> {
    const Context = React.createContext<ContextType>(null!);
    if (__DEV__ || __TEST__) Context.displayName = displayName;

    function useContext() {
        const context = React.useContext(Context);

        if (!context) {
            throwError({
                name: 'UseContextError',
                message: 'You can not use context outside its Provider component',
                callee: useContext,
            });
        }

        return context;
    }

    return [Context.Provider, useContext, Context.Consumer, Context.displayName];
}
