import { TwelveHourOnlyTimeFormat } from '@/Page/Hooks/useMainPage';

const timeFormatter = Intl.DateTimeFormat(undefined, {
  hour12: true,
  hour: 'numeric',
});

const getOnlyHourIn12HourTimeFormat = (date: Date): TwelveHourOnlyTimeFormat =>
  <TwelveHourOnlyTimeFormat>(
    timeFormatter.format(date).replace(' ', '').toLowerCase()
  );

export default getOnlyHourIn12HourTimeFormat;
