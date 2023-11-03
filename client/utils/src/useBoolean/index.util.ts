import React from 'react';

type ReturnType = [boolean, { setToFalse: () => void; setToTrue: () => void; toggle: () => void }];

export function useBoolean(initialValue?: boolean | (() => boolean)): ReturnType {
    const [state, setState] = React.useState(initialValue ?? false);

    const setToTrue = React.useCallback(() => setState(true), []);

    const setToFalse = React.useCallback(() => setState(false), []);

    const toggle = React.useCallback(() => setState((prevState) => !prevState), []);

    return [state, { setToFalse, setToTrue, toggle }];
}
