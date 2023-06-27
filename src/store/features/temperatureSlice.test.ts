import { describe, it } from 'vitest';
import temperatureSlice, { initialState } from './temperatureSlice';

describe('tests for temperatureSlice', () => {
  it('initialize slice with initialValue', () => {
    const temperatureSliceInit = temperatureSlice(initialState, {
      type: 'unkown',
    });
    expect(temperatureSliceInit).toBe(initialState);
  });
});
