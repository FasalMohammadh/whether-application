const dateFormatter = Intl.DateTimeFormat('fr', {
  day: '2-digit',
  month: '2-digit',
});

// format to dd/mm
const toShortDate = (date: Date): string => dateFormatter.format(date);

export default toShortDate;
