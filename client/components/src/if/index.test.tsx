/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { If } from './index.component';

describe.skip('<If/>', () => {
    it('should render `do node` because the condition is `true`', () => {
        const textNode = 'If component testing';

        render(<If condition={true} do={() => <h1>{textNode}</h1>} />);

        //@ts-ignore
        expect(screen.getByRole('heading')).toHaveTextContent(textNode);
    });

    it('should render `else node` because the condition is `false`', () => {
        render(<If condition={false} do={() => <h1>If component testing</h1>} else={() => 'Rendered else node'} />);

        //@ts-ignore
        expect(screen.getByText('Rendered else node')).toBeInTheDocument();

        //@ts-ignore
        expect(screen.queryByText('i, If component testing')).not.toBeInTheDocument();
    });

    it('should render `null` when its true and `do node` is not provided', () => {
        const { container } = render(<If condition={true} />);

        //@ts-ignore
        expect(container).toBeEmptyDOMElement();
    });

    it('should render `null` when its false and `else node` is not provided', () => {
        const { container } = render(<If condition={false} />);

        //@ts-ignore
        expect(container).toBeEmptyDOMElement();
    });
});
