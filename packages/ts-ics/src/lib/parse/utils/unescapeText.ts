// https://icalendar.org/iCalendar-RFC-5545/3-3-11-text.html

// Commas and semicolons are escaped.
export const unescapeTextString = (value: string) =>
  value.replace(/\\([,;])/g, (_, p1) => p1);
