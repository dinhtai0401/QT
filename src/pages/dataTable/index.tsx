import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import { useAppSelector, useAppDispatch } from '../../store/store';
import { fetchTemperatureOneDay } from '../../store/features/temperatureSlice';

export function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(null);
  const dispatch = useAppDispatch();
  const temperatures = useAppSelector(
    (state) => state.temperature.temperatureOneDay
  );

  const handleOnDate = (row: any) => {
    dispatch(fetchTemperatureOneDay(row));
  };

  const keys = temperatures?.hourly.time;
  const values = temperatures?.hourly.temperature_2m;
  const dateData: object[] = keys.map((k, index) => {
    return { time: k.toString(), temp: values[index] };
  });

  return (
    <>
      {row.map((row: any, index: number) => (
        <React.Fragment key={index}>
          <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(open === row ? -1 : row);
                  handleOnDate(open === row ? '-1' : row);
                }}
              >
                {open === row ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row}
            </TableCell>
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
              <Collapse in={open === row} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-extrabold text-3xl pb-3">
                    Temperature
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-neutral-500 dark:text-neutral-400">
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      latitude: {temperatures.latitude}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      longitude: {temperatures.longitude}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      generationtime_ms: {temperatures.generationtime_ms}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      utc_offset_seconds: {temperatures.utc_offset_seconds}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      timezone: {temperatures.timezone}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      timezone_abbreviation:{' '}
                      {temperatures.timezone_abbreviation}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      elevation: {temperatures.elevation}
                    </div>
                    <div className="mb-4 font-semibold text-neutral-500 dark:text-neutral-400">
                      temperature_2m: {temperatures.hourly_units.temperature_2m}
                    </div>
                  </div>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Weather</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dateData?.map((date: any) => (
                        <TableRow key={date.time}>
                          <TableCell component="th" scope="row">
                            {new Date(date.time)
                              .toString()
                              .split(' ')
                              .slice(0, 5)
                              .join(' ')}
                          </TableCell>
                          <TableCell>{date.temp}</TableCell>
                          <TableCell>
                            <AcUnitIcon />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </>
  );
}

export default function CollapsibleTable() {
  const temperatures = useAppSelector(
    (state) => state.temperature.temperatures
  );
  const dateArray: string[] = [];
  temperatures?.hourly.time.map((temp) =>
    dateArray.push(
      new Date(
        Date.UTC(
          new Date(temp).getFullYear(),
          new Date(temp).getMonth(),
          new Date(temp).getDate()
        )
      )
        .toISOString()
        .split('T')[0]
    )
  );
  const uniqueArray = [...new Set(dateArray)];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          <Row row={uniqueArray} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
