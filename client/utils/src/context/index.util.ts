import React from 'react';

import { throwError, __DEV__, __TEST__ } from '..';

export function createContext<ContextType>(displayName: string) {
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

    return [Context.Provider, useContext, Context.Consumer, Context.displayName] as const;
}
