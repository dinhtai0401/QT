import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { mainListItems, secondaryListItems } from '.';

describe('Not Found', () => {
  it('Renders Dashboard', () => {
    render(<> {mainListItems} </>);
    expect(screen.getByText('Dashboard'));
  });
});

describe('Not Found', () => {
  it('Renders Dashboard', () => {
    render(<> {secondaryListItems} </>);
    expect(screen.getByText('Example 1'));
  });
});
