import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { WrappedApp, App } from './App';
import { store } from './store/store';

describe('App', () => {
  it('Renders QT TASK', () => {
    render(
      <Provider store={store}>
        <WrappedApp />
      </Provider>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('QT TASK');
  });
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/banana']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('404');
  });
});
