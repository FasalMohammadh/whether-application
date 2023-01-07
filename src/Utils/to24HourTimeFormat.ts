const timeFormatter = Intl.DateTimeFormat(undefined, {
  hour12: false,
  timeStyle: 'short',
});

const to24HourTimeString = (date: Date): string => timeFormatter.format(date);

export default to24HourTimeString;
