export function getFormattedDate(date: string) {
  const currentDate = new Date(date);
  return `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
}

export function getDateMinusDays(date: string, days: number) {
  const currentDate = new Date(date);
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - days
  );
}
