/* eslint-disable prettier/prettier */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import React from 'react';
import { act } from '@testing-library/react-hooks';

import Dashboard from '.';
import { store } from '../../store/store';

describe('DashBoard', () => {
  const setState = vi.fn();
  const useStateMock: any = () => [true, setState];

  it('Renders new props passing', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });

  it('should update state on click', () => {
    afterEach(() => {
        vi.clearAllMocks();
      });
    vi.spyOn(React, 'useState').mockImplementation(useStateMock);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    const button = screen.getByTestId('test');
    expect(button).toBeTruthy();
    act(() => {fireEvent.click(button)});
  });
});
