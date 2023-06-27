import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '.';

describe('Not Found', () => {
  it('Renders 404', () => {
    render(
      <MemoryRouter initialEntries={['/banana']}>
        <NotFound />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('404');
  });
});
