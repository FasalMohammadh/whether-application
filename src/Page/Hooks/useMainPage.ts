import Axios from 'axios';

import { useEffect, useState } from 'react';

import { SERVER_URL } from '@/Server/config';

import getOnlyHourIn12HourTimeFormat from '@/Utils/to12HourTimeString';

const useMainPage = () => {
  const [currentWhether, setCurrentWhether] = useState<CurrentWhether | null>(
    null
  );
  const [followingWhether, setFollowingWhether] = useState<
    null | FollowingWhether[]
  >(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const clientLocation = await getClientLocation();

        const [currentWhether, followingWhether] = await fetchWhetherInfo(
          controller,
          clientLocation
        );

        setCurrentWhether(currentWhether);
        setFollowingWhether(followingWhether);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return { currentWhether, followingWhether };
};

interface Temperature {
  low: number;
  high: number;
}

type TwelveHourOnlyTimeFormat = `${number}${'am' | 'pm'}`;

interface WhetherResponseData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  rain_sum: number[];
  windspeed_10m_max: number[];
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  sunrise: string;
  sunset: string;
  rain_sum: string;
  windspeed_10m_max: string;
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
}

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

interface CurrentWhether {
  whetherCode: number;
  city: string;
  country: string;
  currentTemperature: number;
  temperature: Temperature;
  windSpeed: number;
  sunrise: Date;
  sunset: Date;
  rain: number;
  hourly: HourlyWhether[];
}

interface HourlyWhether {
  time: TwelveHourOnlyTimeFormat;
  temperature: number;
  whetherCode: number;
}

interface FollowingWhether {
  date: Date;
  whetherCode: number; //determines image to be displayed
  temperature: Temperature;
  windSpeed: number;
  rain: number;
}

async function fetchWhetherInfo(
  controller: AbortController,
  clientLocation: GeolocationPosition
) {
  const whetherInfoStartDate = new Date().toISOString().split('T')[0];
  const whetherInfoEndDate = new Date(
    new Date().valueOf() + 5 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split('T')[0];

  return Axios.get(SERVER_URL, {
    signal: controller.signal,
    params: {
      current_weather: true,
      latitude: clientLocation.coords.latitude,
      longitude: clientLocation.coords.longitude,
      hourly: ['temperature_2m', 'weathercode'],
      start_date: whetherInfoStartDate,
      end_date: whetherInfoEndDate,
      windspeed_unit: 'mph',
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'sunrise',
        'sunset',
        'rain_sum',
        'windspeed_10m_max',
      ],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  }).then(
    ({
      data: whetherData,
    }: {
      data: WhetherResponseData;
    }): [CurrentWhether, FollowingWhether[]] => [
      parseCurrentWhether(whetherData),
      parseFollowingWhether(whetherData),
    ]
  );
}

function parseCurrentWhether(whetherData: WhetherResponseData): CurrentWhether {
  type CurrentDayWhetherSummary = Omit<
    CurrentWhether,
    'hourly' | 'currentTemperature' | 'city' | 'country'
  >;

  const today = new Date().setHours(0, 0, 0, 0).valueOf();

  let currentDayWhetherSummary: CurrentDayWhetherSummary | undefined =
    undefined;
  for (let i = 0; i < whetherData.daily.time.length; i++) {
    const { daily: dailyWhether } = whetherData;
    if (today === new Date(dailyWhether.time[i]).setHours(0, 0, 0, 0).valueOf())
      currentDayWhetherSummary = {
        rain: dailyWhether.rain_sum[i],
        sunrise: new Date(dailyWhether.sunrise[i]),
        sunset: new Date(dailyWhether.sunset[i]),
        windSpeed: Math.round(dailyWhether.windspeed_10m_max[i]),
        whetherCode: 0, //TODO
        temperature: {
          high: Math.round(dailyWhether.temperature_2m_max[i]),
          low: Math.round(dailyWhether.temperature_2m_min[i]),
        },
      };
  }

  const hourlyWhetherInfo = whetherData.hourly.temperature_2m.reduce(
    (preVal: HourlyWhether[], temperature, index): HourlyWhether[] => {
      today ===
        new Date(whetherData.hourly.time[index])
          .setHours(0, 0, 0, 0)
          .valueOf() &&
        preVal.push({
          temperature: Math.round(temperature),
          time: getOnlyHourIn12HourTimeFormat(
            new Date(whetherData.hourly.time[index])
          ),
          whetherCode: whetherData.hourly.weathercode[index],
        });

      return preVal;
    },
    []
  );

  return {
    hourly: hourlyWhetherInfo,
    currentTemperature: Math.round(whetherData.current_weather.temperature),
    city: whetherData.timezone,
    country: whetherData.timezone,
    ...(currentDayWhetherSummary as CurrentDayWhetherSummary),
  };
}

function parseFollowingWhether(
  whetherData: WhetherResponseData
): Array<FollowingWhether> {
  return whetherData.daily.time.reduce(
    (preVal: FollowingWhether[], date, index) => {
      if (
        new Date().setHours(0, 0, 0, 0).valueOf() !==
        new Date(date).setHours(0, 0, 0, 0)
      )
        preVal.push({
          date: new Date(date),
          rain: whetherData.daily.rain_sum[index],
          temperature: {
            high: Math.round(whetherData.daily.temperature_2m_max[index]),
            low: Math.round(whetherData.daily.temperature_2m_min[index]),
          },
          whetherCode: whetherData.daily.rain_sum[index],
          windSpeed: Math.round(whetherData.daily.windspeed_10m_max[index]),
        });
      return preVal;
    },
    []
  );
}

function getClientLocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      currentLocation => {
        resolve(currentLocation);
      },
      error => reject(error)
    );
  });
}

export default useMainPage;
export type { Temperature, TwelveHourOnlyTimeFormat, FollowingWhether };
