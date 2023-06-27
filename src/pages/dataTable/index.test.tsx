import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider } from 'react-redux';

import { Row } from '.';
import { store } from '../../store/store';

describe('Not Found', () => {
  it('Renders new props passing', () => {
    const fakeData = [
      '2023-06-26',
      '2023-06-27',
      '2023-06-28',
      '2023-06-29',
      '2023-06-30',
      '2023-07-01',
      '2023-07-02',
    ];
    render(
      <Provider store={store}>
        <Row row={fakeData} />
      </Provider>
    );
    expect(screen.getByText('2023-07-02'));
  });
});
