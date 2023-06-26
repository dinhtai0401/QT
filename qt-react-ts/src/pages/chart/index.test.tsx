import Highcharts from 'highcharts';
import { render } from '@testing-library/react';

import Chart from '.';

describe('Test - component refs.', () => {
  it('There should be an error before module initialization.', () => {
    expect(() => {
      render(<Chart highcharts={Highcharts} />);
    }).toThrow(Error);
  });
});
