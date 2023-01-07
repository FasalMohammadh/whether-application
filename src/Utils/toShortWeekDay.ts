const dayFormatter = Intl.DateTimeFormat(undefined, {
  weekday: 'short',
});

const toShortWeekDay = (date: Date): string => dayFormatter.format(date);

export default toShortWeekDay;
