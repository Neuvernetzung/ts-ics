export const getOffsetFromTimezoneId = (
  timeZone: string,
  date: Date
): number => {
  const defaultLocale = "en-US"; // Muss en-US sein, da bei anderen Timezones z.B. de-DE new Date() parsen nicht funktioniert.

  const utcDate = new Date(
    date.toLocaleString(defaultLocale, { timeZone: "UTC" })
  );

  try {
    const tzDate = new Date(date.toLocaleString(defaultLocale, { timeZone }));
    return tzDate.getTime() - utcDate.getTime();
  } catch {
    // Fallback to local timezone - https://github.com/Neuvernetzung/ts-ics/issues/104

    return date.getTime() - utcDate.getTime();
  }
};
