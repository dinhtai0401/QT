import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useAppSelector, useAppDispatch } from '../../store/store';
import {
  fetchTemperature,
  fetchTemperatureF,
} from '../../store/features/temperatureSlice';

export default function Chart(props: HighchartsReact.Props) {
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>();
  const { temperatures, temperatureOneDay, checked } = useAppSelector(
    (state) => state.temperature
  );

  const [toggle, setToggle] = React.useState(true);
  const toggleClass = ' transform translate-x-5';
  const dispatch = useAppDispatch();

  const handleOnSwitch = (e: any) => {
    e.preventDefault();
    setToggle(!toggle);
    if (!toggle) {
      dispatch(fetchTemperature());
    } else {
      dispatch(fetchTemperatureF('fahrenheit'));
    }
  };

  const dataChartOneDay = temperatureOneDay?.hourly.temperature_2m.map(
    (temp) => temp
  );

  const dataChart = temperatures?.hourly.temperature_2m.map((temp) => temp);

  const options: any = {
    chart: {
      type: 'area',
      panKey: 'shift',
      scrollablePlotArea: {
        minWidth: 600,
      },
      zoomType: 'x',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      plotLines: [
        {
          color: 'black',
          width: 2,
          value: new Date().getTime(),
        },
      ],
    },
    yAxis: {
      title: {
        text:
          checked === undefined
            ? `${temperatures?.hourly_units.temperature_2m}`
            : `${temperatureOneDay?.hourly_units.temperature_2m}`,
      },
    },
    tooltip: {
      pointFormat: `<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} ${temperatures?.hourly_units.temperature_2m}</b><br/>`,
    },
    series: [
      {
        type: 'area',
        name: 'temperature_2m',
        data: checked === undefined ? dataChart : dataChartOneDay,
        pointStart:
          checked === undefined
            ? Date.UTC(
                new Date(temperatures?.hourly.time[0]).getFullYear(),
                new Date(temperatures?.hourly.time[0]).getMonth(),
                new Date(temperatures?.hourly.time[0]).getDate()
              )
            : Date.UTC(
                new Date(temperatureOneDay?.hourly?.time[0]).getFullYear(),
                new Date(temperatureOneDay?.hourly.time[0]).getMonth(),
                new Date(temperatureOneDay?.hourly.time[0]).getDate()
              ),
        pointInterval: 3600 * 1000,
        lineColor: '#00FF00',
        color: '#00FF00',
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2">
        <div />
        <div className="text-right hover:not-italic italic text-blue-600 font-bold">
          {temperatures?.latitude} °N {temperatures?.longitude} °E{' '}
          {temperatures?.elevation}m above sea level
        </div>
        {checked === undefined ? (
          <div className="text-right">
            <label
              htmlFor="themeSwitcherTwo"
              className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center"
            >
              <input
                type="checkbox"
                name="themeSwitcherTwo"
                id="themeSwitcherTwo"
                className="sr-only"
                onClick={handleOnSwitch}
              />
              <span className="label flex items-center text-sm font-medium text-black">
                °C
              </span>
              <span className="slider mx-3 flex h-7 w-[50px] items-center rounded-full bg-[#CCCCCE] p-1 duration-50">
                <div
                  className={`p-0 bg-black md:w-6 md:h-6 h-5 w-6 rounded-full shadow-md transform duration-300 ease-in-out${
                    toggle ? null : toggleClass
                  }`}
                />
              </span>
              <span className="label flex items-center text-sm font-medium text-black">
                °F
              </span>
            </label>
          </div>
        ) : null}
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...props}
      />
    </>
  );
}
