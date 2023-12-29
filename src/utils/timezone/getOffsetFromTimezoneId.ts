export const getOffsetFromTimezoneId = (
  timeZone: string,
  date: Date
): number => {
  const utcDate = new Date(date.toLocaleString(undefined, { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString(undefined, { timeZone }));
  return tzDate.getTime() - utcDate.getTime();
};
