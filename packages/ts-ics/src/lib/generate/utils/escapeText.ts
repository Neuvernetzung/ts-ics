// https://icalendar.org/iCalendar-RFC-5545/3-3-11-text.html
// Commas and semicolons need to be escaped.
export const escapeTextString = (inputString: string) =>
  inputString.replace(/(?<!\\)[,;\\]/g, (match) => `\\${match}`);
