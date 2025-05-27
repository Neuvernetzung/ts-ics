// https://icalendar.org/iCalendar-RFC-5545/3-3-11-text.html
// According to RFC 5545:
// ESCAPED-CHAR = ("\\" / "\;" / "\," / "\N" / "\n")
//    ; \\ encodes \, \N or \n encodes newline
//    ; \; encodes ;, \, encodes ,
export const unescapeTextString = (value: string) =>
  value
    // Handle escaped characters (backslash, comma, semicolon)
    .replace(/\\([,;\\])/g, "$1");
