import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Temperature {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: any;
    temperature_2m: string;
  };
  hourly: {
    time: any[];
    temperature_2m: string[];
  };
}

interface TemperatureState {
  temperatures: Temperature;
  temperatureOneDay: Temperature;
  checked: any;
}

export const initialState: TemperatureState = {
  temperatures: {
    latitude: 0,
    longitude: 0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: '',
    timezone_abbreviation: '',
    elevation: 0,
    hourly_units: {
      time: new Date(),
      temperature_2m: '',
    },
    hourly: {
      time: [],
      temperature_2m: [],
    },
  },
  temperatureOneDay: {
    latitude: 0,
    longitude: 0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: '',
    timezone_abbreviation: '',
    elevation: 0,
    hourly_units: {
      time: new Date(),
      temperature_2m: '',
    },
    hourly: {
      time: [],
      temperature_2m: [],
    },
  },
  checked: undefined,
};

export const fetchTemperature = createAsyncThunk(
  'temperature/fetch',
  async (_thunkAPI) => {
    const reponse = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&hourly=temperature_2m',
      {
        method: 'GET',
      }
    );
    const data = reponse.json();
    return data;
  }
);

export const fetchTemperatureF = createAsyncThunk(
  'temperature/fetchF',
  async (condition: string, _thunkAPI) => {
    const reponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&hourly=temperature_2m&temperature_unit=${condition}`,
      {
        method: 'GET',
      }
    );
    const data = reponse.json();
    return data;
  }
);

export const fetchTemperatureOneDay = createAsyncThunk(
  'temperature/fetchDay',
  async (condition: string, _thunkAPI) => {
    let reponse: any;
    let data: any;
    if (condition !== '-1') {
      reponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&hourly=temperature_2m&forecast_days=1&start_date=${condition}&end_date=${condition}`,
        {
          method: 'GET',
        }
      );
      data = reponse.json();
    }
    return data;
  }
);

export const TemperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTemperature.fulfilled, (state, action) => {
      state.temperatures = action.payload;
    });
    builder.addCase(fetchTemperatureF.fulfilled, (state, action) => {
      state.temperatures = action.payload;
    });
    builder.addCase(fetchTemperatureOneDay.fulfilled, (state, action) => {
      action.payload !== undefined
        ? (state.temperatureOneDay = action.payload)
        : state.temperatures;
      state.checked = action.payload;
    });
  },
});

export default TemperatureSlice.reducer;
