function getFormatDate(date: string): string {
  const newDate = new Date(`${date}`);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
  };

  const monthName = newDate.toLocaleDateString('ru-RU', options);
  const year = newDate.getFullYear() % 100;
  const formattedYear = year < 10 ? `0${year}` : year.toString();

  return `${monthName[0].toUpperCase()}${monthName.slice(1)} ${formattedYear}`;
}
export { getFormatDate };
